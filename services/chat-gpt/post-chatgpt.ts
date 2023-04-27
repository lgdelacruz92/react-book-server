import { PostChatGPTDataType } from "../../types/chatgpt/post-chat-data-type";
import axios from "axios";

export const postChatGpt = async (data: PostChatGPTDataType) => {
  return await axios.post(process.env.CHATGPT_API_URL, data, {
    headers: { Authorization: `Bearer ${process.env.CHATGPT_API_KEY}` },
  });
};
