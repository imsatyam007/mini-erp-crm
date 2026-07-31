import { useCallback, useState } from "react";
import customerService from "@/services/customer.service";

import type {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "@/types/customer";

export default function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const customers =
        await customerService.getCustomers();

      setCustomers(customers);
    } catch (error) {
      console.error(error);
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  async function createCustomer(
    data: CreateCustomerRequest
  ) {
    await customerService.createCustomer(data);
    await fetchCustomers();
  }

  async function searchCustomers(query: string) {
  setLoading(true);
  setError(null);

  try {
    if (!query.trim()) {
      await fetchCustomers();
      return;
    }

    const customers =
      await customerService.searchCustomers(query);

    setCustomers(customers);
  } catch (error) {
    console.error(error);
    setError("Failed to search customers.");
  } finally {
    setLoading(false);
  }
}

  async function updateCustomer(
    id: string,
    data: UpdateCustomerRequest
  ) {
    await customerService.updateCustomer(id, data);
    await fetchCustomers();
  }

  async function deleteCustomer(id: string) {
    await customerService.deleteCustomer(id);
    await fetchCustomers();
  }

  return {
    customers,
    loading,
    error,

    fetchCustomers,
    searchCustomers,

    createCustomer,
    updateCustomer,
    deleteCustomer,
  };

  
}

