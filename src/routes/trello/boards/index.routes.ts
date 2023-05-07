import { getBoard } from "@/controllers/trello/boards/index.controllers";
import express from "express";

import cardsRoutes from "./cards/index.routes";

const router = express.Router();

router.use("/cards", cardsRoutes);

// routes here
router.get("/:boardId", getBoard);

export default router;
