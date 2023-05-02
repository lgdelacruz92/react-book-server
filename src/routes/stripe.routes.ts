import express from "express";
import { createStripeCustomer } from "@/controllers/stripe.controllers";

const router = express.Router();

router.post("/create", createStripeCustomer);

export default router;
