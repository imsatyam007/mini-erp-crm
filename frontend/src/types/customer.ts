export type CustomerType = "RETAIL" | "WHOLESALE" | "DISTRIBUTOR";

export type CustomerStatus = "LEAD" | "ACTIVE" | "INACTIVE";

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  businessName: string;
  gstNumber?: string;
  customerType: CustomerType;
  status: CustomerStatus;
  address: string;
  followUpDate?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  name: string;
  mobile: string;
  email?: string;
  businessName: string;
  gstNumber?: string;
  customerType: CustomerType;
  status: CustomerStatus;
  address: string;
  followUpDate?: string;
  notes?: string;
}

export type UpdateCustomerRequest = Partial<CreateCustomerRequest>;

export interface CustomerListResponse {
  success: boolean;
  customers: Customer[];
}

export interface CustomerResponse {
  success: boolean;
  customer: Customer;
}