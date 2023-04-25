import { MessageType } from "./message-type";

export interface PostChatDataType {
  model: "gpt-3.5-turbo";
  messages: MessageType[];
}
