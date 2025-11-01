import type { Product } from "@repo/product-db";

export type CartItemType = Product & {
    quantity: number;
    selectedSize?: string;
    selectedColor: string;
}

export type CartItemsType = CartItemType[];

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addtoCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};