"use client";

import { useEffect } from "react";
import useCartStore from "@/store/cartStore";

export function CartReset({ status }: { status: string }) {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (status === "complete") {
      clearCart();
    }
  }, [status, clearCart]);

  return null;
}