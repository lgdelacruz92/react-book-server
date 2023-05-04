import express from "express";
import { createUser, getUser } from "@/controllers/user.controllers";

const router = express.Router();

// user
router.post("/create", createUser);
router.get("/get/:authUserId", getUser);
// end user routes

export default router;
