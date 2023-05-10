import { post } from "@/services/post";
import { ChatCompletion } from "../../../../types/open-ai/chat/completions/completions.types";
import { openAIURL } from "@/constants/open-ai.constants";
import { appConfig } from "@/services/firebase/config";
import { ChatCompletionModel } from "@/models/open-ai/chat/completions/completions.model";

export const postCompletions = async (
  chatCompletionModel: ChatCompletionModel
): Promise<ChatCompletion> => {
  const response = await post<string, ChatCompletion>(
    `${openAIURL}/chat/completions`,
    chatCompletionModel.toString(),
    {
      headers: {
        Authorization: `Bearer ${appConfig.app.chat_gpt_api_key}`,
        "Content-type": "application/json",
      },
    }
  );
  return response.data;
};
