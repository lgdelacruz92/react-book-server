import {
  ChatCompletionChoiceMessage,
  ChatCompletion,
} from "./completion.types";

export const postCompletions = async (
  model: string,
  messages: ChatCompletionChoiceMessage[]
): Promise<ChatCompletion> => {};
