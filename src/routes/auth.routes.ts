import { getAuthUser } from "@/controllers/auth.controller";
import express from "express";

const router = express.Router();

router.get("/get/:authToken", getAuthUser);
// auth
export default router;
