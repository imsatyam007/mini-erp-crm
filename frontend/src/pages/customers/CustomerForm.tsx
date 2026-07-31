import { useState } from "react";
import { useForm } from "react-hook-form";
import customerService from "@/services/customer.service";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";

import {
  customerSchema,
  type CustomerFormData,
} from "@/schemas/customer.schema";

import type { Customer } from "@/types/customer";

interface CustomerFormProps {
  customer?: Customer;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const customerTypeOptions = [
  {
    label: "Retail",
    value: "RETAIL",
  },
  {
    label: "Wholesale",
    value: "WHOLESALE",
  },
    {
    label: "Distributor",
    value: "DISTRIBUTOR",
  },
];

const statusOptions = [
      {
    label: "Lead",
    value: "LEAD",
  },
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
];

export default function CustomerForm({
  customer,
  onSuccess,
  onCancel,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerType: customer?.customerType ?? "RETAIL",
      status: customer?.status ?? "ACTIVE",
      name: customer?.name ?? "",
      businessName: customer?.businessName ?? "",
      mobile: customer?.mobile ?? "",
      email: customer?.email ?? "",
      gstNumber: customer?.gstNumber ?? "",
      address: customer?.address ?? "",
      followUpDate: customer?.followUpDate ?? "",
      notes: customer?.notes ?? "",
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CustomerFormData) => {
    try {
      setLoading(true);

      if (customer) {
        await customerService.updateCustomer(customer.id, data);
      } else {
        await customerService.createCustomer(data);
      }

      reset();

      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert(
        customer
          ? "Failed to update customer."
          : "Failed to create customer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-lg border border-border bg-surface p-6"
    >
      <h2 className="text-xl font-semibold text-text">
        {customer ? "Edit Customer" : "Add Customer"}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          id="name"
          label="Customer Name"
          placeholder="Enter customer name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          id="businessName"
          label="Business Name"
          placeholder="Enter business name"
          error={errors.businessName?.message}
          {...register("businessName")}
        />

        <Input
          id="mobile"
          label="Mobile Number"
          placeholder="Enter mobile number"
          error={errors.mobile?.message}
          {...register("mobile")}
        />

        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="Enter email address"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          id="gstNumber"
          label="GST Number"
          placeholder="Enter GST Number"
          error={errors.gstNumber?.message}
          {...register("gstNumber")}
        />

        <Input
          id="followUpDate"
          type="date"
          label="Follow-up Date"
          error={errors.followUpDate?.message}
          {...register("followUpDate")}
        />

        <Select
          id="customerType"
          label="Customer Type"
          options={customerTypeOptions}
          error={errors.customerType?.message}
          {...register("customerType")}
        />

        <Select
          id="status"
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register("status")}
        />
      </div>

      <TextArea
        id="address"
        label="Address"
        placeholder="Enter customer address"
        error={errors.address?.message}
        {...register("address")}
      />

      <TextArea
        id="notes"
        label="Notes"
        placeholder="Additional notes"
        error={errors.notes?.message}
        {...register("notes")}
      />

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset();
            onCancel?.();
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={loading}
        >
          {customer ? "Update Customer" : "Save Customer"}
        </Button>
      </div>
    </form>
  );
}