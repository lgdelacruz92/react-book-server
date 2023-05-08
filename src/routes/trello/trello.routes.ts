import express from "express";
import BoardsRouter from "./boards/boards.routes";
import MembersRouter from "./members/members.routes";

const router = express.Router();

// routes here
router.use("/boards", BoardsRouter);
router.use("/members", MembersRouter);

export default router;
