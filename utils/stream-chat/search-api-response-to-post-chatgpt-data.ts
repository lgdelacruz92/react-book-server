import { SearchAPIResponse, DefaultGenerics } from "stream-chat";
import { PostChatGPTDataType } from "../../types/chatgpt/post-chat-data-type";

export const searchAPIResponseToPostChatGPTData = (
  messages: SearchAPIResponse<DefaultGenerics>
): PostChatGPTDataType => {
  return {
    model: "gpt-3.5-turbo",
    messages: messages.results.map((result) => ({
      role: result.message.user.id === "assistant" ? "assistant" : "user",
      content: result.message.text,
    })),
  };
};
