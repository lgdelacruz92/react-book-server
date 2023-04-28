import express from "express";
import { Request, Response } from "express";
import { chapters } from "./chapters/chapters";
import cors from "cors";
import bodyParser from "body-parser";
import { startTutoring } from "./api/start-tutoring";
import { stopTutoring } from "./api/stop-tutoring";
import {
  createUserForChannel,
  getUserForChannel,
} from "./api/firestore/channel-user-repository";
import { createUser, getUser } from "./api/firestore/user";
import { userChat } from "./webhooks/user-chat";
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.post("/api/webhook/user-chat", userChat);

// app.post("/api/streamchat/token", async (req: Request, res: Response) => {
//   const { user } = req.body;

// res.json({ token: createStreamChatToken(user) });
// });

// app.post("/api/webhook/streamchat", async (req: Request, res: Response) => {
//   // grab channel id from body
//   const { channel_id, user } = req.body;

//   // connect to channel
//   const { members } = await AppStreamChat.getChannelMembers(channel_id);
//   const messages = await streamChatInstance.search(
//     {
//       members: {
//         $in: [...members.map((member) => member.user_id)],
//       },
//     },
//     { text: { $exists: true } },
//     { limit: 100, offset: 0, sort: [{ updated_at: -1 }] }
//   );

//   messages.results.reverse();

//   // messages.results.map((result) => console.log(result.message.text));
//   if (user.id !== "assistant") {
//     // 1. transform stream-chat messages into a chatGPT messages
//     const postChatGPTMessages = searchAPIResponseToPostChatGPTData(messages);
//     postChatGPTMessages.messages.map((chatGptmessages) =>
//       console.log(chatGptmessages.content)
//     );
//     const response = await postChatGpt(postChatGPTMessages);
//     const { choices } = response.data;
//     const responseMessage = {
//       text: choices[0].message.content,
//       user: { id: "assistant" },
//     };
//     // await channel.sendMessage(responseMessage);
//   }

//   res.sendStatus(200);
// });

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
