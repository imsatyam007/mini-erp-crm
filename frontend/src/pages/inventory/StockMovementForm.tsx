import { useForm } from "react-hook-form";

import { useProducts } from "@/hooks/useProducts";

import type { CreateStockMovementRequest } from "@/types/stockMovement";

interface StockMovementFormProps {
  onSubmit: (data: CreateStockMovementRequest) => Promise<void>;
}

export default function StockMovementForm({
  onSubmit,
}: StockMovementFormProps) {
  const { products, loading } = useProducts();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStockMovementRequest>({
    defaultValues: {
      productId: "",
      quantity: 1,
      movementType: "IN",
      reason: "",
    },
  });

  const submitHandler = async (
    data: CreateStockMovementRequest
  ) => {
    await onSubmit(data);
    reset({
      productId: "",
      quantity: 1,
      movementType: "IN",
      reason: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-surface border border-border rounded-xl shadow-card p-6 space-y-5"
    >
      <h2 className="text-xl font-semibold text-text">
        Stock Movement
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Product
          </label>

          <select
            {...register("productId", {
              required: "Product is required",
            })}
            disabled={loading}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.sku})
              </option>
            ))}
          </select>

          <p className="text-danger text-sm mt-1">
            {errors.productId?.message}
          </p>
        </div>

        {/* Movement Type */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Movement Type
          </label>

          <select
            {...register("movementType", {
              required: "Movement type is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          >
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>

          <p className="text-danger text-sm mt-1">
            {errors.movementType?.message}
          </p>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            {...register("quantity", {
              valueAsNumber: true,
              required: "Quantity is required",
              min: {
                value: 1,
                message: "Quantity must be at least 1",
              },
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.quantity?.message}
          </p>
        </div>

        {/* Reason */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-text">
            Reason
          </label>

          <textarea
            rows={3}
            {...register("reason", {
              required: "Reason is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.reason?.message}
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg"
      >
        {isSubmitting ? "Saving..." : "Save Movement"}
      </button>
    </form>
  );
}