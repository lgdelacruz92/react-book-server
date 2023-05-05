import {
  createUser as createUserService,
  getUser as getUserService,
  putUser as putUserService,
} from "@/services/firebase/user.service";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    // This should be more general to pass the props haha
    const newUserId = uuidv4();
    const userInfo = await createUserService(newUserId, {
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
    const userInfo = await getUserService(authUserId);
    res.json({ ...userInfo });
  } catch (e) {
    res.status(404).json(e);
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { authUserId } = req.params;
  const { props } = req.body;
  try {
    const writeResult = await putUserService(authUserId, props);
    res.status(200).json(writeResult);
  } catch (e) {
    res.status(500).send(e);
  }
};
