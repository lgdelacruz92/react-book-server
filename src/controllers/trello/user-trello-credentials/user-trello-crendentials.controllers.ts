import UserTrelloCredential from "@/models/trello/user-trello-credentials/user-trello-credential.models";
import { Request, Response, NextFunction } from "express";
import {
  createUserTrelloCredentials as createUserTrelloCredentialsService,
  getUserTrelloCredentials as getUserTrelloCredentialsService,
} from "@/services/trello/user-trello-credentials/user-trello-credentials.services";
import { decryptString, encryptString } from "@/utils/crypto.utils";

export const createUserTrelloCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authUserId, key, token } = req.body;
    await createUserTrelloCredentialsService(
      new UserTrelloCredential({
        authUserId,
        key: encryptString(key),
        token: encryptString(token),
      })
    );
    res.status(200).send("UserTrelloCredential created");
  } catch (e) {
    next(e);
  }
};

export const getUserTrelloCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authUserId } = req.params;
    const userTrelloCredentials = await getUserTrelloCredentialsService(
      authUserId
    );
    const decryptedUserTrelloCredentials = {
      ...userTrelloCredentials.json(),
      key: decryptString(userTrelloCredentials.json().key),
      token: decryptString(userTrelloCredentials.json().token),
    };
    res.status(200).json(decryptedUserTrelloCredentials);
  } catch (e) {
    next(e);
  }
};
