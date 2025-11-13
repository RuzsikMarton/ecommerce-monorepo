import z from "zod";

export interface CustomJwtSessionClaims {
  metadata?: {
    role?: "admin" | "user";
  };
}

export const UserFormSchema = z
  .object({
    firstName: z
      .string({ message: "First name is required!" })
      .min(2, { message: "First name must be at least 2 characters!" })
      .max(50),
    lastName: z
      .string({ message: "Last name is required!" })
      .min(2, { message: "Last name must be at least 2 characters!" })
      .max(50),
    username: z
      .string({ message: "Last name is required!" })
      .min(2, { message: "Last name must be at least 2 characters!" })
      .max(50),
    emailAddress: z.array(z.string({ message: "Invalid email address!" })),
    password: z
      .string({ message: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters!" })
      .max(50),
    confirmPassword: z.string({ message: "Confirm Password is required!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
