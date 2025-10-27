"use client"

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import  useCartStore  from "@/store/cartStore";

const ShoppingCartIcon = () => {

  const {cart , hasHydrated} = useCartStore();
  return (
    <Link href="/cart" className="relative">
        <ShoppingCart className="w-4 h-4"/>
        {hasHydrated && <span className="absolute -top-3 -right-3 bg-accent rounded-full text-gray-600 font-semibold w-4 h-4 text-center text-xs">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
    </Link>
  )
}

export default ShoppingCartIcon