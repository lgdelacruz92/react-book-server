import {
  createUserTrelloCredentials,
  getUserTrelloCredentials,
} from "@/controllers/trello/user-trello-credentials/user-trello-crendentials.controllers";
import express from "express";

const router = express.Router();

// routes here
router.post("/create", createUserTrelloCredentials);
router.get("/get/:authUserId", getUserTrelloCredentials);

export default router;
