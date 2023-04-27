import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import { chapters } from "./chapters/chapters";
import cors from "cors";
import { findInChapter } from "./utils/find-section";
import bodyParser from "body-parser";
import { postChatGpt } from "./services/chat-gpt/post-chatgpt";
import { sendStreamChatMessageResponse } from "./services/send-stream-chat-message";
import { createStreamChatToken } from "./utils/stream-chat/create-stream-chat-token";
import { startTutoring } from "./api/start-tutoring";
import { stopTutoring } from "./api/stop-tutoring";
import { streamChatInstance } from "./services/stream-chat-instance";
import { searchAPIResponseToPostChatGPTData } from "./utils/stream-chat/search-api-response-to-post-chatgpt-data";
import {
  createUserForChannel,
  getUserForChannel,
} from "./api/firestore/channel-user-repository";
import { createUser, getUser } from "./api/firestore/user";
import { upsertStreamChatUser } from "./services/upsert-stream-chat-user";

require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.get("/api/chapters", (req: Request, res: Response) => {
  res.json(chapters);
});

app.get("/api/chapters/:fileName", (req: Request, res: Response) => {
  const sectionMarkdownText = fs.readFileSync(
    `./chapters/${req.params.fileName}.txt`,
    "utf-8"
  );
  const sectionInfo = findInChapter(chapters, req.params.fileName);
  res.json({
    title: sectionInfo.title,
    content: sectionMarkdownText,
    fileName: sectionInfo.fileName,
  });
});

// I don't actually need all of this
// I can just use stream chat to listen for messages
app.post("/api/chatgpt", async (req: Request, res: Response) => {
  const { messages, channelId, userToken } = req.body;
  try {
    const response = await postChatGpt({
      model: "gpt-3.5-turbo",
      messages,
    });
    res.setHeader("Content-Type", "application/json");

    const aiResponseJson = response.data;
    const aiResponseMessage =
      aiResponseJson.choices[aiResponseJson.choices.length - 1].message.content;
    const aiResponseUserId =
      aiResponseJson.choices[aiResponseJson.choices.length - 1].message.role;

    const message = await sendStreamChatMessageResponse(
      channelId,
      aiResponseMessage,
      aiResponseUserId,
      userToken || createStreamChatToken(aiResponseUserId)
    );
    res.send({ message });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/api/streamchat/token", async (req: Request, res: Response) => {
  const { user } = req.body;

  res.json({ token: createStreamChatToken(user) });
});

app.post("/api/webhook/streamchat", async (req: Request, res: Response) => {
  // grab channel id from body
  const { channel_id, user } = req.body;

  // connect to channel
  const channel = streamChatInstance.channel("messaging", channel_id);

  const messages = await streamChatInstance.search(
    { members: { $in: [user.id, "assistant"] } },
    { text: { $exists: true } },
    { limit: 100, offset: 0, sort: [{ updated_at: -1 }] }
  );

  messages.results.reverse();

  if (user.id !== "assistant") {
    // 1. transform stream-chat messages into a chatGPT messages
    const postChatGPTMessages = searchAPIResponseToPostChatGPTData(messages);
    const response = await postChatGpt(postChatGPTMessages);
    const { choices } = response.data;
    const responseMessage = {
      text: choices[0].message.content,
      user: { id: "assistant" },
    };
    await channel.sendMessage(responseMessage);
  }

  res.sendStatus(200);
});

app.post("/api/start-tutoring", startTutoring);
app.post("/api/stop-tutoring", stopTutoring);

// Firestore
app.post("/api/channel-user-repository/create", createUserForChannel);
app.get("/api/channel-user-repository/get/:channelId", getUserForChannel);

app.post("/api/user/create", createUser);
app.get("/api/user/get/:userId", getUser);

const port = 3003;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
