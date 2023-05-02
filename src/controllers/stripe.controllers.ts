import { Request, Response } from "express";
import { createStripeCustomer as createStripeCustomerService } from "@/services/stripe.service";

export const createStripeCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await createStripeCustomerService(req.body);
    res.status(201).json(customer);
  } catch (e) {
    res.status(500).send(e || "An error occurred while creating the customer.");
  }
};
