import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid Email Address"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+?[1-9]\d{1,14}$/.test(phone),
      "Invalid Phone Number"
    ),
});
