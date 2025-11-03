"use client";

import { shippingFormInputs } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { CartItemsType } from "@repo/types";
import useCartStore from "@/store/cartStore";
const stripe = loadStripe(
  "pk_test_51SLfgeBJaO8IITXnG2QMoKRtOK6wEqmmXFhkYMq8szjwL7OR2HrAXCZ5evlw17XbT9XFPEMI3n8ZBaficfgBvS3w00fcHJej8f"
);

const clientSecret = async (cart: CartItemsType,token: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/session/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({ cart }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: shippingFormInputs;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const { getToken } = useAuth();
  const { cart } = useCartStore();

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, []);

  if (!token) {
    return <div>Loading...</div>;
  }

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ clientSecret: clientSecret(cart, token) }}
    >
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
