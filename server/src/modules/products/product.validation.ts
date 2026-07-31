import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name is required."),

  sku: z
    .string()
    .min(2, "SKU is required."),

  category: z
    .string()
    .min(2, "Category is required."),

  unitPrice: z
    .number({
      error: "Unit price is required.",
    })
    .positive("Unit price must be greater than 0."),

  currentStock: z
    .number({
      error: "Current stock is required.",
    })
    .int()
    .min(0, "Current stock cannot be negative."),

  minimumStock: z
    .number({
      error: "Minimum stock is required.",
    })
    .int()
    .min(0, "Minimum stock cannot be negative."),

  warehouse: z
    .string()
    .min(2, "Warehouse is required."),
});

export const updateProductSchema =
  createProductSchema.partial();

export type CreateProductInput =
  z.infer<typeof createProductSchema>;

export type UpdateProductInput =
  z.infer<typeof updateProductSchema>;