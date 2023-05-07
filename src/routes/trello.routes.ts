import { getBoard } from "@/controllers/trello.controllers";
import express from "express";

const router = express.Router();

// routes here
router.get("/boards/:boardId", getBoard);

export default router;
