import { PostChatDataType } from "../../types/chatgpt/post-chat-data-type";
import axios from "axios";

export const postChat = async (data: PostChatDataType) => {
  return await axios.post(process.env.CHATGPT_API_URL, data, {
    headers: { Authorization: `Bearer ${process.env.CHATGPT_API_KEY}` },
  });
};
