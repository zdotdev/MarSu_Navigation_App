import { z } from "zod"

export const sign_up_schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z.string().min(3, { message: "Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      },
    )
});

export const sign_in_schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      },
    ),
});