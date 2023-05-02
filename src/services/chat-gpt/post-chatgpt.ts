import { MessageChatGPTType } from "@/types/chatgpt/message-type";
import { PostChatGPTDataType } from "../../types/chatgpt/post-chat-data-type";
import axios from "axios";
import { appConfig } from "@/services/firebase/config";

export const postChatGpt = async (
  data: PostChatGPTDataType
): Promise<MessageChatGPTType> => {
  const response = await axios.post(
    appConfig.app.chat_gpt_api_url || "",
    data,
    {
      headers: {
        Authorization: `Bearer ${appConfig.app.chat_gpt_api_key}`,
        "Content-Type": "application/json",
      },
    }
  );

  const { choices } = response.data;

  if (!choices || choices.length === 0) {
    throw Error("Something went wrong. AI did not respond.");
  }

  return { ...choices[0].message };
};
