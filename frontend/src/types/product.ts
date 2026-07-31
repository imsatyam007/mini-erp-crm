export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitPrice: string;
  currentStock: number;
  minimumStock: number;
  warehouse: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  product: Product;
}

export interface ProductListResponse {
  success: boolean;
  products: Product[];
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  category: string;
  unitPrice: number;
  currentStock: number;
  minimumStock: number;
  warehouse: string;
}

export interface UpdateProductRequest {
  name?: string;
  sku?: string;
  category?: string;
  unitPrice?: number;
  currentStock?: number;
  minimumStock?: number;
  warehouse?: string;
}