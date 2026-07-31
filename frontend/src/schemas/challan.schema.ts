import { z } from "zod";

export const challanSchema = z.object({
  customerId: z
    .string()
    .trim()
    .min(1, "Customer is required"),

  status: z.enum(["DRAFT", "CONFIRMED"], {
    message: "Status must be DRAFT or CONFIRMED",
  }),

  items: z
    .array(
      z.object({
        productId: z
          .string()
          .trim()
          .min(1, "Product is required"),

        quantity: z
          .number({
            message: "Quantity is required",
          })
          .int("Quantity must be an integer")
          .positive("Quantity must be greater than 0"),
      })
    )
    .min(1, "At least one product is required")
    .superRefine((items, ctx) => {
      const seen = new Set<string>();

      items.forEach((item, index) => {
        if (seen.has(item.productId)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [index, "productId"],
            message: "Duplicate products are not allowed.",
          });
        }

        seen.add(item.productId);
      });
    }),
});

export type ChallanFormData = z.infer<typeof challanSchema>;