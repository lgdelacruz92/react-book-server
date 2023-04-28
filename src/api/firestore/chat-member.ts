import { ChatChannel } from "@/models/chat/chat-channel";
import { ChatUser } from "@/models/chat/chat-user";
import { Request, Response } from "express";
export const putChatMember = async (req: Request, res: Response) => {
  const { token, channelId, userId } = req.params;

  try {
    const chatUser = new ChatUser(userId);
    await chatUser.connect(token);

    const channel = new ChatChannel(channelId);
    const members = await channel.addMember(userId);
    res.status(200).json(members);
  } catch (e: any) {
    console.log(`Error adding member\nReason: ${e}`);
    res.status(500).send(e.message);
  }
};
