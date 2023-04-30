import { ChatChannel } from "@/models/chat/chat-channel";
import { ChatMessage } from "@/models/chat/chat-message";
import { ChatUser } from "@/models/chat/chat-user";
import { postChatGpt } from "@/services/chat-gpt/post-chatgpt";
import { MessageChatGPTType } from "@/types/chatgpt/message-type";
import { PostChatGPTDataType } from "@/types/chatgpt/post-chat-data-type";
import { Request, Response } from "express";
import { v4 } from "uuid";

export const userChat = async (req: Request, res: Response) => {
  // get the messages from the channel
  try {
    const { channel_id, user } = req.body;
    if (user.id !== "assistant") {
      const channel = new ChatChannel(channel_id);
      const messages = await channel.getChannelMessages();

      // Transform messages into something that can be sent
      // to chatGpt
      const messagesChatGptFormat: MessageChatGPTType[] = messages.map(
        (message) => {
          return {
            role:
              message.user && message.user.id === "assistant"
                ? "assistant"
                : "user",
            content: message.text,
          };
        }
      );
      const chatGPTPayload: PostChatGPTDataType = {
        model: "gpt-3.5-turbo",
        messages: [...messagesChatGptFormat],
      };
      const chatGPTResponse = await postChatGpt(chatGPTPayload);

      await channel.sendMessage(
        new ChatMessage(
          v4(),
          chatGPTResponse.content,
          new ChatUser(chatGPTResponse.role)
        )
      );

      res.status(200).json(chatGPTResponse);
    } else {
      res.status(200);
    }
  } catch (e: any) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
