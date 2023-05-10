import express from "express";
import completionsRouter from "./completions/completions.routes";

const router = express.Router();

// routes here
router.use("/completions", completionsRouter);

export default router;
