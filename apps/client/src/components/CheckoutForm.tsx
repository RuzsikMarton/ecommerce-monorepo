"use client";

import { useState } from "react";
import { shippingFormInputs } from "@/types";
import { useCheckout, PaymentElement } from "@stripe/react-stripe-js/checkout";
import { ConfirmError } from "@stripe/stripe-js";
import { ShoppingCartIcon } from "lucide-react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: shippingFormInputs;
}) => {
  const checkoutState = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  if (checkoutState.type === "loading") {
    return <div>Loading checkout...</div>;
  }

  if (checkoutState.type === "error") {
    return <div>Error: {checkoutState.error.message}</div>;
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await checkoutState.checkout.updateEmail(shippingForm.email);
      await checkoutState.checkout.updateShippingAddress({
        name: shippingForm.name,
        address: {
          line1: shippingForm.address,
          city: shippingForm.city,
          postal_code: shippingForm.postalCode,
          country: "SK",
        },
      });

      const res = await checkoutState.checkout.confirm();
      if (res.type === "error") {
        setError(res.error);
      }
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <PaymentElement
        options={{
          layout: "accordion",
        }}
      />
      <button
        className="w-full mt-2 bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-md cursor-pointer flex items-center justify-center gap-2 transition duration-300"
        disabled={loading}
        onClick={handleClick}
      >
        {loading ? (
          "Processing..."
        ) : (
          <div className="flex items-center justify-center gap-2">
            <ShoppingCartIcon className="w-3 h-3" /> Checkout
          </div>
        )}
      </button>
      {error && <div className="text-red-500 p-1">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
