import { StreamChat } from "stream-chat";
require("dotenv").config();

export const streamChatInstance = StreamChat.getInstance(
  process.env.STREAMCHAT_KEY || "",
  process.env.STREAMCHAT_SECRET || ""
);
