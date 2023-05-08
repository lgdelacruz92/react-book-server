import UserTrelloCredential from "@/models/trello/user-trello-credentials/user-trello-credential.models";
import { Request, Response, NextFunction } from "express";
import { createUserTrelloCredentials as createUserTrelloCredentialsService } from "@/services/trello/user-trello-credentials/user-trello-credentials.services";

export const createUserTrelloCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authUserId, key, token } = req.body;
    await createUserTrelloCredentialsService(
      new UserTrelloCredential({ authUserId, key, token })
    );
    res.status(200).send("UserTrelloCredential created");
  } catch (e) {
    next(e);
  }
};
