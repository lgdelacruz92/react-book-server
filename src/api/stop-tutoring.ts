// import { streamChatInstance } from "../services/stream-chat-instance";
import { Request, Response } from "express";

export const stopTutoring = async (req: Request, res: Response) => {
  const { channel_id } = req.body;

  // try {
  //   // Stop watching the channel with the given `channel_id`
  //   const channel = streamChatInstance.channel("messaging", channel_id);
  //   await channel.stopWatching();

  //   res.status(200).json({ success: true });
  // } catch (error) {
  //   console.error(error);
  //   // res.status(500).json({ error: error.message });
  // }
};
