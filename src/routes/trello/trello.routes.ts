import express from "express";
import BoardsRouter from "./boards/boards.routes";

const router = express.Router();

// routes here
router.use("/boards", BoardsRouter);

export default router;
