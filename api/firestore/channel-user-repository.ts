import ChannelUserRepository from "../../services/firestore/channel-user-repository";
import { Request, Response } from "express";

export const createChannelUserRepository = async (
  req: Request,
  res: Response
) => {
  const { channelId, userId } = req.body;
  try {
    await ChannelUserRepository.createUserForChannel(channelId, userId);
    res.sendStatus(200);
  } catch (e) {
    res.json(e);
  }
};
