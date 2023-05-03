import express from "express";
import { createUser, getUser } from "@/controllers/user.controllers";

const router = express.Router();
// user
router.post("/create", createUser);
router.get("/get/:authUserId", getUser);

export default router;
