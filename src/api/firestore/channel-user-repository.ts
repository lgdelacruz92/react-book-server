import ChannelUserRepository from "../../services/firestore/channel-user-repository";
import { Request, Response } from "express";

export const createUserForChannel = async (req: Request, res: Response) => {
  const { channelId, userId } = req.body;
  try {
    await ChannelUserRepository.createUserForChannel(channelId, userId);
    res.sendStatus(200);
  } catch (e) {
    res.json(e);
  }
};

export const getUserForChannel = async (req: Request, res: Response) => {
  const { channelId } = req.params;
  try {
    const userId = await ChannelUserRepository.getUserForChannel(channelId);
    res.json({ userId });
  } catch (e) {
    res.json(e);
  }
};
