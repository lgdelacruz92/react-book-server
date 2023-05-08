import { getMyBoards } from "@/controllers/trello/members/members.controllers";
import express from "express";

const router = express.Router();

router.get("/me/boards", getMyBoards);

export default router;
