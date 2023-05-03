import { Request, Response } from "express";
import { createStripeCustomer as createStripeCustomerService } from "@/services/stripe/stripe.service";
import { Stripe } from "stripe";
import { handleCheckoutSessionCompleted } from "@/services/stripe/stripe.webhook";

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
  if (event.type === "checkout.session.completed") {
    try {
      const customer = await handleCheckoutSessionCompleted(event);
      res.status(200).json(customer);
    } catch (e) {
      res.send(500).send(e);
    }
  } else {
    res.send(200).send("no action for the event. moving on...");
  }
};
