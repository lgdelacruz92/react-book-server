import express from "express";
import cors from "cors";
import {
  createUserForChannel,
  getUserForChannel,
} from "./api/firestore/channel-user-repository";
import { createUser, getUser } from "./api/firestore/user";
import { userChat } from "./webhooks/user-chat";
import { postChatToken, postCreateChat } from "./api/chat/chat";

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.post("/api/webhook/user-chat", userChat);

// Firestore
app.post("/api/channel-user-repository/create", createUserForChannel);
app.get("/api/channel-user-repository/get/:channelId", getUserForChannel);

// user
app.post("/api/user/create", createUser);
app.get("/api/user/get/:authUserId", getUser);

// chat
// Todo: Chat is better name than channel
// app.post("/api/channel/create", createChannel) // pass (usertoken, members, )
// app.put("/api/channel/:channelId/member/put/:userId/:token", putChatMember);
app.post("/api/chat/token", postChatToken);
app.post("/api/chat/create", postCreateChat);

// const port = 3003;
// app.listen(port, () => {
//   console.log("Server listening on port " + port);
// });
export { app };
