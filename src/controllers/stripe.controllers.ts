import { Request, Response } from "express";
import {
  createCheckoutSession as createCheckoutSessionService,
  createStripeCustomer as createStripeCustomerService,
  expireCheckoutSession as expireCheckoutSessionService,
} from "@/services/stripe/stripe.service";
import { Stripe } from "stripe";
import { handleCheckoutSessionCompleted } from "@/services/stripe-user/stripe-user.service";
import { getAuthToken } from "@/utils/get-auth-token";

// customers
export const createStripeCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await createStripeCustomerService(req.body);
    res.status(201).json(customer);
  } catch (e) {
    res.status(500).send(e || "An error occurred while creating the customer.");
  }
};

// events
export const postEvent = async (req: Request, res: Response) => {
  const event: Stripe.Event = req.body;
  const authorization = getAuthToken(req.headers.authorization || "");
  if (event.type === "checkout.session.completed") {
    try {
      const customer = await handleCheckoutSessionCompleted(
        event,
        authorization
      );
      res.status(200).json(customer);
    } catch (e) {
      res.send(500).send(e);
    }
  } else {
    res.send(200).send("no action for the event. moving on...");
  }
};

// Checkout sessions
export const createCheckoutSession = async (req: Request, res: Response) => {
  const sessionCreateParams = req.body;
  try {
    const stripeResponse = await createCheckoutSessionService(
      sessionCreateParams
    );
    if (stripeResponse.lastResponse.statusCode !== 200) {
      res
        .status(stripeResponse.lastResponse.statusCode)
        .json({ message: "Error creating a checkout session" });
    } else {
      res.status(stripeResponse.lastResponse.statusCode).json(stripeResponse);
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const expireCheckoutSession = async (req: Request, res: Response) => {
  const { csSessionId } = req.params;

  try {
    const stripeResponse = await expireCheckoutSessionService(csSessionId);
    if (stripeResponse.lastResponse.statusCode !== 200) {
      res
        .status(stripeResponse.lastResponse.statusCode)
        .json({ message: "Error expiring a checkout session" });
    } else {
      res.status(stripeResponse.lastResponse.statusCode).json(stripeResponse);
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};
