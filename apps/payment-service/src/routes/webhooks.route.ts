import { Hono } from "hono";
import stripe from "../utils/stripe";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const webhookRoute = new Hono();

webhookRoute.post("/stripe", async (c) => {
  const body = await c.req.text();
  const signature = c.req.header("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err) {
    console.log("Webhook signature verification failed.", err);
    return c.json({ error: "Webhook verification failed" }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      console.log("Checkout Session completed:", session);
      {
        /*TODO: create order */
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return c.json({ received: true });
});

export default webhookRoute;