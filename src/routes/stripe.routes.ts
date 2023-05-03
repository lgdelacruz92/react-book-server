import express from "express";
import {
  createCheckoutSession,
  createStripeCustomer,
  postEvent,
  expireCheckoutSession,
} from "@/controllers/stripe.controllers";

const router = express.Router();

router.post("/create", createStripeCustomer);
router.post("/webhook/post-event", postEvent);
router.post("/checkout-session/create", createCheckoutSession);
router.post("/checkout-session/:csSessionId/expire", expireCheckoutSession);

export default router;
