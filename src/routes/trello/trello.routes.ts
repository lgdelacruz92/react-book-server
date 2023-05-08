import express from "express";
import BoardsRouter from "./boards/boards.routes";
import MembersRouter from "./members/members.routes";
import UserTrelloCredentialRoutes from "./user-trello-credentials/user-trello-credentials.routes";

const router = express.Router();

// routes here
router.use("/boards", BoardsRouter);
router.use("/members", MembersRouter);
router.use("/user-trello-credentials", UserTrelloCredentialRoutes);

export default router;
