import express from "express";
import chatRoutes from "./chat/chat.routes";

const router = express.Router();

// routes here
router.use("/chat", chatRoutes);

export default router;
