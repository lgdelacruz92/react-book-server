import { Request, Response, NextFunction } from "express";
import { getMyBoards as getMyBoardsService } from "@/services/trello/members/members.services";

export const getMyBoards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myBoards = await getMyBoardsService();
    res.status(200).json(myBoards);
  } catch (e) {
    next(e);
  }
};
