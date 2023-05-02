export type StripeCustomer = {
  id: string;
  object: "customer";
  address: {
    city: string | null;
    country: string | null;
    line1: string | null;
    line2: string | null;
    postal_code: string | null;
    state: string | null;
  } | null;
  created: number;
  email: string | null;
  description: string | null;
  name: string | null;
  metadata: { [key: string]: string };
  phone: string | null;
};
