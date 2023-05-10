import { BaseModel } from "@/models/base.model";
import { ChatCompletion } from "@/types/open-ai/chat/completions/completions.types";

export class ChatCompletionModel extends BaseModel<ChatCompletion> {
  constructor(_chatCompletion: ChatCompletion) {
    super(_chatCompletion);
  }
}
