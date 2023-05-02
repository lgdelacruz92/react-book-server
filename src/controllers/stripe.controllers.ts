import { StripeCustomer } from "@/types/stripe.types";
import { appConfig } from "@/services/firebase/config";
import { post } from "./post";
import { Request, Response } from "express";

const url = "https://api.stripe.com/v1/customers";

export const createStripeCustomer = async (req: Request, res: Response) => {
  const { email, description } = req.body;
  const headers = {
    Authorization: `Bearer ${appConfig.app.stripe_secret_key}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const data = new URLSearchParams();
  data.append("email", email);
  data.append("description", description);

  try {
    const response = await post<string, StripeCustomer>(url, data.toString(), {
      headers,
    });
    res.status(response.status).json(response.data);
  } catch (e) {
    res.status(500).send(e);
  }
};
