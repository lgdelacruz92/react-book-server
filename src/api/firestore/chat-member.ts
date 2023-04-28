import { ChatChannel } from "@/models/chat/chat-channel";
import { ChatUser } from "@/models/chat/chat-user";
import { Request, Response } from "express";
import ChatInstance from "@/services/stream-chat/stream-chat-instance";

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

export const postChatMemberToken = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const token = await ChatInstance.createToken(userId);
    res.status(200).json({ token });
  } catch (e: any) {
    console.log(`Error creating token\nReason: ${e}`);
    res.status(500).json(e.message);
  }
};
