import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import useCustomers from "@/hooks/useCustomers";
import { useProducts } from "@/hooks/useProducts";

import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/Card";

import {
  challanSchema,
  type ChallanFormData,
} from "@/schemas/challan.schema";

import type {
  CreateChallanRequest,
  SalesChallan,
} from "@/types/challan";

interface ChallanFormProps {
  challan?: SalesChallan;
  onSave: (data: CreateChallanRequest) => Promise<void>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ProductRow {
  productId: string;
  quantity: number;
}

export default function ChallanForm({
  challan,
  onSave,
  onSuccess,
  onCancel,
}: ChallanFormProps) {
  const {
  customers,
  fetchCustomers,
} = useCustomers();
  const { products } = useProducts();

  const [loading, setLoading] = useState(false);

  const [productRows, setProductRows] = useState<ProductRow[]>([
    {
      productId: "",
      quantity: 1,
    },
  ]);

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ChallanFormData>({
    resolver: zodResolver(challanSchema),
    defaultValues: {
     customerId: challan?.customer.id ?? "",
     status:
       challan?.status === "CONFIRMED"
         ? "CONFIRMED"
         : "DRAFT",
     items: [],
    },
  });

const onSubmit = async (data: ChallanFormData) => {
  try {
    setLoading(true);

    const payload: CreateChallanRequest = {
      customerId: data.customerId,
      status: data.status,
      items: productRows.map((row) => ({
        productId: row.productId,
        quantity: row.quantity,
      })),
    };

    await onSave(payload);

    onSuccess?.();
    onCancel?.();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (!challan) return;

    reset({
     customerId: challan.customer.id,
     status:
       challan.status === "CANCELLED"
         ? "DRAFT"
         : challan.status,
     items: challan.items.map((item) => ({
       productId: item.productId,
       quantity: item.quantity,
     })),
    });

    setProductRows(
      challan.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))
    );
  }, [challan, reset]);

  const totalQuantity = useMemo(() => {
    return productRows.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [productRows]);

  const handleAddProduct = () => {
  setProductRows((prev) => [
    ...prev,
    {
      productId: "",
      quantity: 1,
    },
  ]);
};

const handleRemoveProduct = (index: number) => {
  const updatedRows = productRows.filter((_, i) => i !== index);

  setProductRows(updatedRows);

  setValue(
    "items",
    updatedRows.map((row) => ({
      productId: row.productId,
      quantity: row.quantity,
    })),
    {
      shouldValidate: true,
    }
  );
};

const handleProductChange = (
  index: number,
  productId: string
) => {
  const updatedRows = [...productRows];

  updatedRows[index].productId = productId;

  setProductRows(updatedRows);

  setValue(
    "items",
    updatedRows.map((row) => ({
      productId: row.productId,
      quantity: row.quantity,
    })),
    {
      shouldValidate: true,
    }
  );
};

const handleQuantityChange = (
  index: number,
  quantity: number
) => {
  const updatedRows = [...productRows];

  updatedRows[index].quantity =
    quantity < 1 ? 1 : quantity;

  setProductRows(updatedRows);

  setValue(
    "items",
    updatedRows.map((row) => ({
      productId: row.productId,
      quantity: row.quantity,
    })),
    {
      shouldValidate: true,
    }
  );
};

useEffect(() => {
  fetchCustomers();
}, [fetchCustomers]);

useEffect(() => {
  setValue(
    "items",
    productRows.map((row) => ({
      productId: row.productId,
      quantity: row.quantity,
    })),
    {
      shouldValidate: true,
    }
  );
}, [productRows, setValue]);

return (
  <Card>
    <CardHeader>
      <CardTitle>
        {challan ? "Edit Challan" : "Create Challan"}
      </CardTitle>
    </CardHeader>

    <CardContent>
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    {/* Customer */}
    <Select
      id="customerId"
      label="Customer"
      value={watch("customerId")}
      onChange={(e) =>
        setValue("customerId", e.target.value, {
          shouldValidate: true,
        })
      }
      options={customers.map((customer) => ({
        value: customer.id,
        label: customer.name,
      }))}
      
      error={errors.customerId?.message}
    />

    {/* Status */}
    <Select
      id="status"
      label="Status"
      value={watch("status")}
      onChange={(e) =>
        setValue(
          "status",
          e.target.value as "DRAFT" | "CONFIRMED",
          {
            shouldValidate: true,
          }
        )
      }
      options={[
        {
          value: "DRAFT",
          label: "Draft",
        },
        {
          value: "CONFIRMED",
          label: "Confirmed",
        },
      ]}
      error={errors.status?.message}
    />

    {/* Products */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text">
          Products
        </h3>

        <Button
          type="button"
          variant="secondary"
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </div>

      {productRows.map((row, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-4 items-end"
        >
          {/* Product */}
          <div className="col-span-7">
            <Select
              label="Product"
              value={row.productId}
              onChange={(e) =>
                handleProductChange(index, e.target.value)
              }
              options={products.map((product) => ({
                value: product.id,
                label: product.name,
              }))}
              
            />
          </div>

          {/* Quantity */}
          <div className="col-span-3">
            <Input
              type="number"
              label="Quantity"
              min={1}
              value={row.quantity}
              onChange={(e) =>
                handleQuantityChange(
                  index,
                  Number(e.target.value)
                )
              }
            />
          </div>

          {/* Remove Button */}
          <div className="col-span-2">
            <Button
              type="button"
              variant="danger"
              onClick={() =>
                handleRemoveProduct(index)
              }
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>

    {/* Summary */}
    <Card className="p-4">
      <div className="flex justify-between">
        <span className="font-medium">
          Total Products
        </span>

        <span>{productRows.length}</span>
      </div>

      <div className="mt-2 flex justify-between">
        <span className="font-medium">
          Total Quantity
        </span>

        <span>{totalQuantity}</span>
      </div>
    </Card>

    {/* Actions */}
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        loading={loading}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        variant="primary"
        loading={loading}
      >
        {challan
          ? "Update Challan"
          : "Create Challan"}
      </Button>
    </div>
  </form>
</CardContent>
  </Card>
);
}