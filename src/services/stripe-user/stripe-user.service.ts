import Stripe from "stripe";
import {
  getStripeCustomer,
  updateStripeCustomer,
} from "@/services/stripe/stripe.service";
import { verifyUser } from "@/services/firebase/auth.service";
import { getUser, putUser } from "@/services/firebase/user.service";

export const handleCheckoutSessionCompleted = async (
  event: Stripe.Event,
  token: string
) => {
  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.customer) {
    // Customer ID not available, throw an error or handle accordingly
    throw Error(
      `There are no customers in the session. Session object: ${JSON.stringify(
        session
      )}`
    );
  }

  const stripeCustomer = await getStripeCustomer(session.customer.toString());
  const authUserId = await verifyUser(token);

  // Add customer id to firebase
  await putUser(authUserId, { stripeCustomerId: stripeCustomer.id });

  // Get firebase user saved
  const user = await getUser(authUserId);

  // Update the customer object as needed, e.g., adding metadata, creating a subscription, etc.
  // For example, adding a note to the customer's metadata:
  return await updateStripeCustomer(stripeCustomer.id, { metadata: user });
};
