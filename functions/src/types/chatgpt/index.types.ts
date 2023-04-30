import { MessageChatGPTType } from "./message-type";

export interface ChoiceType {
  message: MessageChatGPTType;
  finish_reason?: string;
  index?: string;
}
