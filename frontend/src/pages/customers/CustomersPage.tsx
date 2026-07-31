import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import useCustomers from "@/hooks/useCustomers";
import CustomerDetails from "@/pages/customers/CustomerDetails";
import CustomerTable from "@/pages/customers/components/CustomerTable";
import customerService from "@/services/customer.service";

import type { Customer } from "@/types/customer";

import CustomerForm from "./CustomerForm";

export default function CustomersPage() {
  const {
    customers,
    loading,
    error,
    fetchCustomers,
    searchCustomers,
  } = useCustomers();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [search, setSearch] = useState("");

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(null);
    setShowCustomerForm(true);
    setEditingCustomer(customer);
  };

  const handleDelete = async (customer: Customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${customer.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await customerService.deleteCustomer(customer.id);

      if (selectedCustomer?.id === customer.id) {
        setSelectedCustomer(null);
      }

      await fetchCustomers();

      alert("Customer deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete customer.");
    }
  };

  const handleSearch = async (value: string) => {
    setSearch(value);
    await searchCustomers(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">
            Customers
          </h1>

          <p className="text-sm text-text-secondary">
            Manage all your customers.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingCustomer(null);
            setShowCustomerForm(true);
          }}
        >
          + Add Customer
        </Button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-danger">
          {error}
        </p>
      )}

      {showCustomerForm && (
        <CustomerForm
          customer={editingCustomer ?? undefined}
          onSuccess={() => {
            setShowCustomerForm(false);
            setEditingCustomer(null);
            fetchCustomers();
          }}
          onCancel={() => {
            setShowCustomerForm(false);
            setEditingCustomer(null);
          }}
        />
      )}

      {selectedCustomer && (
        <CustomerDetails
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search by name, mobile, email or business..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full max-w-md rounded-md border border-border bg-background px-3 py-2 text-text outline-none focus:border-primary"
        />
      </div>

      <CustomerTable
        customers={customers}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}