import fetch from "node-fetch";
import { PostChatDataType } from "../../types/chatgpt/post-chat-data-type";

const url = "http://example.com/api/endpoint";

export const postChat = async (data: PostChatDataType) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};
