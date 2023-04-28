import { ChatChannel } from "@/models/chat/chat-channel";
import { Request, Response } from "express";

export const userChat = async (req: Request, res: Response) => {
  // get the messages from the channel
  try {
    const { channel_id } = req.body;
    const channel = new ChatChannel(channel_id);
    const messages = await channel.getChannelMessages();
    res.json({ messages });
  } catch (e) {
    res.json(e).status(500);
  }
};
