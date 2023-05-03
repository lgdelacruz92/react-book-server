import Users from "@/services/firebase/user.service";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const newUserId = uuidv4();
    const userInfo = await Users.createUser(newUserId, {
      userId: newUserId,
      channelId: uuidv4(),
      authUserId: userId,
    });
    res.json(userInfo).status(200);
  } catch (e) {
    res.json(e);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { authUserId } = req.params;
  try {
    const userInfo = await Users.getUser(authUserId);
    res.json({ ...userInfo });
  } catch (e) {
    res.status(404).json(null);
  }
};
