import { verifyUser } from "@/services/firebase/auth.service";
import { Request, Response } from "express";

export const getAuthUser = async (req: Request, res: Response) => {
  const { authToken } = req.params;
  try {
    const userId = await verifyUser(authToken);
    res.status(200).json({ userId });
  } catch (e) {
    res.status(500).send(e);
  }
};
