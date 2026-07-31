import { CustomerStatus, CustomerType } from "@prisma/client";
import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

  email: z.email("Invalid email").optional(),

  businessName: z
    .string()
    .min(2, "Business name is required"),

  gstNumber: z.string().optional(),

  customerType: z.nativeEnum(CustomerType),

  status: z.nativeEnum(CustomerStatus),

  address: z
    .string()
    .min(5, "Address is required"),

  followUpDate: z.coerce.date().optional(),

  notes: z.string().optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

// Update Customer Schema
export const updateCustomerSchema =
  createCustomerSchema.partial();

export type UpdateCustomerInput =
  z.infer<typeof updateCustomerSchema>;