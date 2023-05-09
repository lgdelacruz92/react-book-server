import express from "express";
import { getCards } from "@/controllers/trello/boards/cards/cards.controllers";

const router = express.Router({ mergeParams: true });

// routes here
router.get("/", getCards);

export default router;
