import {
  getBoard,
  getBoards,
} from "@/controllers/trello/boards/index.controllers";
import express from "express";

const router = express.Router();

// routes here
router.get("/", getBoards);
router.get("/:boardId", getBoard);

export default router;
