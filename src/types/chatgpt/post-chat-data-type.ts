import { MessageChatGPTType } from "./message-type";

export interface PostChatGPTDataType {
  model: "gpt-3.5-turbo";
  messages: MessageChatGPTType[];
}
