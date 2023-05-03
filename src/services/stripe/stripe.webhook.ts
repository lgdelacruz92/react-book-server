import Stripe from "stripe";
import { appConfig } from "../firebase/config";

const stripe = new Stripe(appConfig.app.stripe_secret_key, {
  apiVersion: "2022-11-15",
});

export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.customer) {
    // Customer ID not available, throw an error or handle accordingly
    return;
  }

  // Retrieve your existing customer object using the customer ID from the session
  const customer = await stripe.customers.retrieve(session.customer.toString());

  // Update the customer object as needed, e.g., adding metadata, creating a subscription, etc.
  // For example, adding a note to the customer's metadata:
  await stripe.customers.update(customer.id, {
    metadata: {
      ...customer.metadata,
      paymentLinkNote: `Payment made using Payment Link for ${session.line_items.data[0].description}`,
    },
  });
};
