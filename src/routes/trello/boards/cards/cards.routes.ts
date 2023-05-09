import express from "express";
import {
  getCards,
  getCard,
} from "@/controllers/trello/boards/cards/cards.controllers";

const router = express.Router({ mergeParams: true });

// routes here
router.get("/", getCards);
router.get("/:cardId", getCard);

export default router;
