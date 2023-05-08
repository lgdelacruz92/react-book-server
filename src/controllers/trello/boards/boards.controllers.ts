import { NextFunction, Request, Response } from "express";
import { getBoard as getBoardService } from "@/services/trello/trello.services";

// boards
export const getBoard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;
    const board = await getBoardService(boardId);
    res.status(200).json(board);
  } catch (e) {
    next(e);
  }
};
