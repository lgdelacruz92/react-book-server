export class StripeCustomer {
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

  constructor(customerData: Partial<StripeCustomer>) {
    this.id = customerData.id || "";
    this.object = "customer";
    this.address = customerData.address || null;
    this.created = customerData.created || 0;
    this.email = customerData.email || null;
    this.description = customerData.description || null;
    this.name = customerData.name || null;
    this.metadata = customerData.metadata || {};
    this.phone = customerData.phone || null;
  }

  toJson(): string {
    return JSON.stringify(this);
  }

  static fromJson(json: string): StripeCustomer {
    const parsedData = JSON.parse(json);
    return new StripeCustomer(parsedData);
  }
}
