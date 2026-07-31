import axiosInstance from "@/api/axios";

import type {
  Customer,
  CustomerListResponse,
  CustomerResponse,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "@/types/customer";

class CustomerService {
  async getCustomers(): Promise<Customer[]> {
    const { data } =
      await axiosInstance.get<CustomerListResponse>("/customers");

    return data.customers;
  }

  async searchCustomers(
  query: string
): Promise<Customer[]> {
  const { data } =
    await axiosInstance.get<CustomerListResponse>(
      "/customers/search",
      {
        params: {
          q: query,
        },
      }
    );

  return data.customers;
}

  async getCustomerById(
    id: string
  ): Promise<Customer> {
    const { data } =
      await axiosInstance.get<CustomerResponse>(
        `/customers/${id}`
      );

    return data.customer;
  }

  async createCustomer(
    payload: CreateCustomerRequest
  ): Promise<Customer> {
    const { data } =
      await axiosInstance.post<CustomerResponse>(
        "/customers",
        payload
      );

    return data.customer;
  }

  async updateCustomer(
    id: string,
    payload: UpdateCustomerRequest
  ): Promise<Customer> {
    const { data } =
      await axiosInstance.put<CustomerResponse>(
        `/customers/${id}`,
        payload
      );

    return data.customer;
  }

  async deleteCustomer(
    id: string
  ): Promise<void> {
    await axiosInstance.delete(`/customers/${id}`);
  }
}

export default new CustomerService();