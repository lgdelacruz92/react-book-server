import { MessageChatGPTType } from "@/types/chatgpt/message-type";
import { PostChatGPTDataType } from "../../types/chatgpt/post-chat-data-type";
import axios from "axios";

export const postChatGpt = async (
  data: PostChatGPTDataType
): Promise<MessageChatGPTType> => {
  const response = await axios.post(process.env.CHATGPT_API_URL || "", data, {
    headers: {
      Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const { choices } = response.data;

  if (!choices || choices.length === 0) {
    throw Error(`Something went wrong. AI did not respond.`);
  }

  return { ...choices[0].message };
};
