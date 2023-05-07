import { Request, Response } from "express";
import {
  getBoard as getBoardService,
  getBoards as getBoardsService,
} from "@/services/trello/trello.services";

// boards
export const getBoard = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const board = await getBoardService(boardId);
    res.status(200).json(board);
  } catch (e) {
    res.status(404).send(e);
  }
};

// boards
export const getBoards = async (req: Request, res: Response) => {
  try {
    const board = await getBoardsService();
    res.status(200).json(board);
  } catch (e) {
    res.status(404).send(e);
  }
};
