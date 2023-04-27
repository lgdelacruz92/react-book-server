import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import { chapters } from "./chapters/chapters";
import cors from "cors";
import { findInChapter } from "./utils/find-section";
import bodyParser from "body-parser";
import { postChat } from "./services/api/chatgpt";
import { sendStreamChatMessageResponse } from "./services/send-stream-chat-message";
import { createStreamChatToken } from "./utils/stream-chat/create-stream-chat-token";
import { startTutoring } from "./api/start-tutoring";
import { stopTutoring } from "./api/stop-tutoring";

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
    const response = await postChat({
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

app.post("/api/start-tutoring", startTutoring);
app.post("/api/stop-tutoring", stopTutoring);

const port = 3003;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
