import Stripe from "stripe";
import { appConfig } from "../firebase/config";

export const stripe = new Stripe(appConfig.app.stripe_secret_key, {
  apiVersion: "2022-11-15",
});

interface CreateCustomerType {
  email?: string;
  description?: string;
  // Add more optional properties here as needed
}

type StripeCustomerMetadata = Stripe.CustomerUpdateParams | undefined;

export const createStripeCustomer = async (
  customer: CreateCustomerType
): Promise<Stripe.Customer> => {
  return await stripe.customers.create(customer);
};

export const getStripeCustomer = async (
  stripeCustomerId: string
): Promise<Stripe.Customer> => {
  // Retrieve your existing customer object using the customer ID from the session
  const retrieveResponse = await stripe.customers.retrieve(stripeCustomerId);

  if ("deleted" in retrieveResponse && retrieveResponse.deleted) {
    throw new Error("Customer not found");
  }

  return retrieveResponse as Stripe.Customer;
};

export const updateStripeCustomer = async (
  stripeCustomerId: string,
  metadata?: StripeCustomerMetadata
) => {
  return await stripe.customers.update(stripeCustomerId, metadata);
};
