import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type {
  CreateProductRequest,
  Product,
} from "@/types/product";

interface ProductFormProps {
  onSubmit: (data: CreateProductRequest) => Promise<void>;
  editingProduct?: Product | null;
  onCancel?: () => void;
}

export default function ProductForm({
  onSubmit,
  editingProduct,
  onCancel,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductRequest>();

  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name,
        sku: editingProduct.sku,
        category: editingProduct.category,
        unitPrice: Number(editingProduct.unitPrice),
        currentStock: editingProduct.currentStock,
        minimumStock: editingProduct.minimumStock,
        warehouse: editingProduct.warehouse,
      });
    } else {
      reset({
        name: "",
        sku: "",
        category: "",
        unitPrice: 0,
        currentStock: 0,
        minimumStock: 0,
        warehouse: "",
      });
    }
  }, [editingProduct, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-surface border border-border rounded-xl shadow-card p-6 space-y-5"
    >
      <h2 className="text-xl font-semibold text-text">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Product Name
          </label>

          <input
            {...register("name", {
              required: "Product name is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.name?.message}
          </p>
        </div>

        {/* SKU */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            SKU
          </label>

          <input
            {...register("sku", {
              required: "SKU is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.sku?.message}
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Category
          </label>

          <input
            {...register("category", {
              required: "Category is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.category?.message}
          </p>
        </div>

        {/* Unit Price */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Unit Price
          </label>

          <input
            type="number"
            step="0.01"
            {...register("unitPrice", {
              valueAsNumber: true,
              required: "Unit price is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.unitPrice?.message}
          </p>
        </div>

        {/* Current Stock */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Current Stock
          </label>

          <input
            type="number"
            {...register("currentStock", {
              valueAsNumber: true,
              required: "Current stock is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.currentStock?.message}
          </p>
        </div>

        {/* Minimum Stock */}
        <div>
          <label className="block mb-1 text-sm font-medium text-text">
            Minimum Stock
          </label>

          <input
            type="number"
            {...register("minimumStock", {
              valueAsNumber: true,
              required: "Minimum stock is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.minimumStock?.message}
          </p>
        </div>

        {/* Warehouse */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-text">
            Warehouse
          </label>

          <input
            {...register("warehouse", {
              required: "Warehouse is required",
            })}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background text-text"
          />

          <p className="text-danger text-sm mt-1">
            {errors.warehouse?.message}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-border px-5 py-2 rounded-lg text-text"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}