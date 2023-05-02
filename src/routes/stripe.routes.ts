import express from "express";
import { createStripeCustomer } from "@/controllers/stripe.controllers";

const router = express.Router();

router.post("/", createStripeCustomer);

export default router;
