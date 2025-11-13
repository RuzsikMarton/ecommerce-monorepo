import type { Product, Category } from "@repo/product-db";
import z from "zod";

export type ProductType = Product;

export type ProductsType = ProductType[];

export type StripeProductType = {
  id: string;
  name: string;
  price: number;
};

export const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

export const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

export const ProductFormSchema = z
  .object({
    name: z
      .string({ message: "Product name is required!" })
      .min(1, { message: "Product name is required!" }),
    shortDescription: z
      .string({ message: "Short description is required!" })
      .min(1, "Short description is required!")
      .max(60, "Short description must be less than 60 characters!"),
    description: z
      .string({ message: "Description is required!" })
      .min(1, "Description is required!"),
    price: z.number().min(1, "Price is required!"),
    categorySlug: z
      .string({ message: "Category is required!" })
      .min(1, "Category is required!"),
    sizes: z.array(z.enum(sizes)).optional(),
    colors: z.array(z.enum(colors)).min(1, "At least one color is required!"),
    images: z.record(z.string(), z.string(), {
      message: "Image for each color is required!",
    }),
  })
  .refine(
    (data) => {
      const missingImages = data.colors.filter(
        (color: string) => !data.images?.[color]
      );
      return missingImages.length === 0;
    },
    { message: "Image for each selected color is required!", path: ["images"] }
  );

export type CategoryType = Category;

export const CategoryFormSchema = z.object({
  name: z
    .string({ message: "Name is required!" })
    .min(1, { message: "Name is required!" }),
  slug: z
    .string({ message: "Slug is required!" })
    .min(1, { message: "Slug is required!" }),
});
