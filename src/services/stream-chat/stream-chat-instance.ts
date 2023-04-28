import { StreamChat } from "stream-chat";
require("dotenv").config();

const streamChatInstance = StreamChat.getInstance(
  process.env.STREAMCHAT_KEY || "",
  process.env.STREAMCHAT_SECRET || ""
);

export default streamChatInstance;
