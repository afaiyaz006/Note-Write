import { z } from "zod";

const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name must not be empty")
    .min(2, "First name should be atleast 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name should not be empty")
    .min(2, "Last name should be atleast 2 characters"),
  emailAddress: z
    .string()
    .min(1, "Email should not be empty")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password should not be empty")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

export { SignUpSchema };
