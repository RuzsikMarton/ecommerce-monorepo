import { z } from "zod";

export interface Products {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes?: string[];
  colors: [string, ...string[]];
  images: Record<string, string>;
}

export type ProductsType = Products[];

export interface CartItems extends Products {
  quantity: number;
  selectedSize?: string | null;
  selectedColor: string;
}

export type CartItemsType = CartItems[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "Invalid email format!"
    )
    .min(1, "Email is required"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 15 digits")
    .max(15, "Phone number must be between 7 and 15 digits")
    .regex(
      /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Invalid phone number format"
    ),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

export type shippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required"),
  cardNumber: z
    .string()
    .min(16, "Card number is required")
    .max(16, "Card number must be 16 digits"),
  expirationDate: z
    .string()
    .min(1, "Expiration date required")
    .regex(
      /^(0[1-9]|1[0-2])(\/|-)([0-9]{4})$/gm,
      "Invalid expiration date format must be in MM/YYYY format"
    ),
  cvv: z.string().min(3, "CVV is required").max(3, "CVV must be 3 digits"),
});

export type paymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addtoCart: (product: CartItems) => void;
  removeFromCart: (product: CartItems) => void;
  clearCart: () => void;
};
