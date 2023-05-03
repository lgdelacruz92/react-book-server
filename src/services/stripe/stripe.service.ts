import Stripe from "stripe";
import { appConfig } from "../firebase/config";

const stripe = new Stripe(appConfig.app.stripe_secret_key, {
  apiVersion: "2022-11-15",
});

interface CreateCustomerType {
  email?: string;
  description?: string;
  // Add more optional properties here as needed
}

export const createStripeCustomer = async (
  customer: CreateCustomerType
): Promise<Stripe.Customer> => {
  return await stripe.customers.create(customer);
};
