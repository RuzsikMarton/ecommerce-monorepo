import { Hono } from "hono";
import stripe from "../utils/stripe";
import { userAuthMiddleware } from "../middleware/authMiddleware";
import { getStripeProductPrice } from "../utils/stripeProduct";

const sessionRoute = new Hono();

const clientURL = process.env.CLIENT_URL || "http://localhost:3002";

sessionRoute.post("/create-checkout-session", userAuthMiddleware, async (c) => {
  const { cart } = await c.req.json();
  const userId = c.get("userId");

  const lineItems = await Promise.all(
    cart.map( async (item : any) => {
      const unitAmount = await getStripeProductPrice(item.id);
      return {
        price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
            },
            unit_amount: unitAmount as number,
          },
          quantity: item.quantity,
      }
    })
  )
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items: lineItems,
      client_reference_id: userId,
      mode: "payment",
      ui_mode: "custom",
      return_url: `${clientURL}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      console.error("Stripe session created but client_secret is missing:", session);
      return c.json({ error: "Failed to create checkout session - no client secret" }, 500);
    }

    return c.json({ checkoutSessionClientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return c.json({ error: "Failed to create checkout session" }, 500);
  }
});

sessionRoute.get("/:session_id", async (c) => {
  const { session_id } = c.req.param();
  const session = await stripe.checkout.sessions.retrieve(session_id as string, {
    expand: ['line_items'],
  })
  return c.json({ status: session.status, paymentStatus: session.payment_status });
})

export default sessionRoute;
