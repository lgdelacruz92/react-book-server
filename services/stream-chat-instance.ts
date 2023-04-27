import { StreamChat } from "stream-chat";
require("dotenv").config();

// console.log("key", process.env.STREAMCHAT_KEY);
// console.log("secret", process.env.STREAMCHAT_SECRET);
export const streamChatInstance = StreamChat.getInstance(
  process.env.STREAMCHAT_KEY || "",
  process.env.STREAMCHAT_SECRET || ""
);
