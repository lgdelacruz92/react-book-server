import { postChatCompletions } from "@/controllers/open-ai/chat/completions/completions.controllers";
import express from "express";

const router = express.Router({ mergeParams: true });

// routes here
router.post("/", postChatCompletions);

export default router;
