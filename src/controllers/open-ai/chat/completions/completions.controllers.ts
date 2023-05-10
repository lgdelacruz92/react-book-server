import { ChatCompletionModel } from "@/models/open-ai/chat/completions/completions.model";
import { postCompletions as postCompletionsService } from "@/services/open-ai/chat/completions/completions.service";
import { Request, Response, NextFunction } from "express";

export const postChatCompletions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatCompletionRequest = req.body;
    const chatCompletionModel = new ChatCompletionModel(chatCompletionRequest);
    const data = await postCompletionsService(chatCompletionModel);
    res.json(data).status(200);
  } catch (error) {
    next(error);
  }
};
