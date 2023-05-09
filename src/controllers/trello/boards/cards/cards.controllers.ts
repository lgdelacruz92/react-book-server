import { Request, Response, NextFunction } from "express";
import {
  getCards as getCardsService,
  getCard as getCardService,
} from "@/services/trello/boards/cards/cards.service";

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId } = req.params;
    const cards = await getCardsService(boardId);
    res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
};

export const getCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId, cardId } = req.params;
    const card = await getCardService(boardId, cardId);
    res.status(200).json(card);
  } catch (error) {
    next(error);
  }
};
