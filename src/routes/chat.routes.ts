import express from "express";
import { postChatToken, postCreateChat } from "@/controllers/chat.controllers";

const router = express.Router();
router.post("/token", postChatToken);
router.post("/create", postCreateChat);

export default router;
