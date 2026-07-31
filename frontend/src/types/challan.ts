export type ChallanStatus =
  | "DRAFT"
  | "CONFIRMED"
  | "CANCELLED";

export interface ChallanCustomer {
  id: string;
  name: string;
  businessName: string;
  mobile: string;
}

export interface ChallanProduct {
  id: string;
  name: string;
  sku: string;
  category?: string;
  warehouse?: string;
  currentStock?: number;
}

export interface ChallanItem {
  id: string;
  challanId: string;
  productId: string;
  productName: string;
  productSku: string;
  unitPrice: string;
  quantity: number;
  createdAt: string;
  product?: ChallanProduct;
}

export interface SalesChallan {
  id: string;
  challanNumber: string;
  customerId: string;
  totalQuantity: number;
  status: ChallanStatus;
  createdById: string;
  createdAt: string;
  updatedAt: string;

  customer: ChallanCustomer;

  items: ChallanItem[];
}

export interface CreateChallanItemRequest {
  productId: string;
  quantity: number;
}

export interface CreateChallanRequest {
  customerId: string;
  status?: ChallanStatus;
  items: CreateChallanItemRequest[];
}

export interface UpdateChallanRequest {
  customerId: string;
  status: ChallanStatus;
  items: CreateChallanItemRequest[];
}

export interface SalesChallanResponse {
  success: boolean;
  message?: string;
  data: SalesChallan;
}

export interface SalesChallanListResponse {
  success: boolean;
  data: SalesChallan[];
}