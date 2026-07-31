import { z } from "zod";

export const createStockMovementSchema = z.object({
  productId: z.string().min(1, "Product is required"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),

  movementType: z.enum(["IN", "OUT"]),

  reason: z
    .string()
    .min(3, "Reason must be at least 3 characters")
    .max(255, "Reason cannot exceed 255 characters"),
});

export type CreateStockMovementInput = z.infer<
  typeof createStockMovementSchema
>;