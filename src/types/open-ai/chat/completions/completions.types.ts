export interface ChatCompletionUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface ChatCompletionChoiceMessage {
  role: string;
  content: string;
}

export interface ChatCompletionChoice {
  message: ChatCompletionChoiceMessage;
  finish_reason: string;
  index: number;
}

export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: ChatCompletionUsage;
  choices: ChatCompletionChoice[];
}

export type ChatCompletionPost = {
  headers: Record<string, string>;
  body: string;
};
