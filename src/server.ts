import express from "express";
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
import { postChatToken, postCreateChat } from "./api/chat/chat";
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.post("/api/webhook/user-chat", userChat);

app.post("/api/start-tutoring", startTutoring);
app.post("/api/stop-tutoring", stopTutoring);

// Firestore
app.post("/api/channel-user-repository/create", createUserForChannel);
app.get("/api/channel-user-repository/get/:channelId", getUserForChannel);

// user
app.post("/api/user/create", createUser);
app.get("/api/user/get/:userId", getUser);

// chat
// Todo: Chat is better name than channel
// app.post("/api/channel/create", createChannel) // pass (usertoken, members, )
// app.put("/api/channel/:channelId/member/put/:userId/:token", putChatMember);
app.post("/api/chat/token", postChatToken);
app.post("/api/chat/create", postCreateChat);

const port = 3003;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
