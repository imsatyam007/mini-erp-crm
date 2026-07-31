import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Customer name must be at least 2 characters"),

  businessName: z
    .string()
    .trim()
    .min(2, "Business name is required"),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  gstNumber: z.string().optional(),

  customerType: z.enum([
  "RETAIL",
  "WHOLESALE",
  "DISTRIBUTOR",
]),

  status: z.enum([
  "LEAD",
  "ACTIVE",
  "INACTIVE",
]),
  address: z
    .string()
    .trim()
    .min(5, "Address is required"),

  followUpDate: z.string().optional(),

  notes: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;