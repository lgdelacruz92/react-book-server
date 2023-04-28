import Users from "@/services/firestore/user";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const userInfo = await Users.createUser(userId, {
      userId,
      channelId: uuidv4(),
    });
    res.json(userInfo).status(200);
  } catch (e) {
    res.json(e);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userInfo = await Users.getUser(userId);
    res.json({ ...userInfo });
  } catch (e) {
    res.json(e);
  }
};
