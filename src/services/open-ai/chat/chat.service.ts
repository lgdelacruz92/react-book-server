import { StreamChat } from "stream-chat";
import { appConfig } from "@/services/firebase/config";

const ChatInstance = StreamChat.getInstance(
  appConfig.app.stream_chat_key || "",
  appConfig.app.stream_chat_secret || ""
);

export default ChatInstance;
