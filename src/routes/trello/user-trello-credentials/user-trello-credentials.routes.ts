import { createUserTrelloCredentials } from "@/controllers/trello/user-trello-credentials/user-trello-crendentials.controllers";
import express from "express";

const router = express.Router();

// routes here
router.post("/create", createUserTrelloCredentials);

export default router;
