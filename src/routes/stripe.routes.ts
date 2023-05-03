import express from "express";
import {
  createStripeCustomer,
  postEvent,
} from "@/controllers/stripe.controllers";

const router = express.Router();

router.post("/create", createStripeCustomer);
router.post("/webhook/post-event", postEvent);

export default router;
