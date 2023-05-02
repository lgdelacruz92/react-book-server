import { StripeCustomer } from "@/services/stripe/stripe.types";
import { appConfig } from "@/services/firebase/config";

type CreateCustomerDataType = {
  email: string;
  description: string;
};

const url = "https://api.stripe.com/v1/customers";
const headers = {
  Authorization: `Bearer ${appConfig.app.stripe_secret_key}`,
  "Content-Type": "application/json",
};

export const createCustomer = async (data: CreateCustomerDataType) => {
  return post<CreateCustomerDataType, StripeCustomer>(url, data, { headers });
};
