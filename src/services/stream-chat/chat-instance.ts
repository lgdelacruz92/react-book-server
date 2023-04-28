import { StreamChat } from "stream-chat";
require("dotenv").config();

const ChatInstance = StreamChat.getInstance(
  process.env.STREAMCHAT_KEY || "",
  process.env.STREAMCHAT_SECRET || ""
);

export default ChatInstance;
