export type MovementType = "IN" | "OUT";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitPrice: string;
  currentStock: number;
  minimumStock: number;
  warehouse: string;
}

export interface CreatedBy {
  id: string;
  name: string;
  email: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  quantity: number;
  movementType: MovementType;
  reason: string;
  createdById: string;
  createdAt: string;

  product: Product;
  createdBy: CreatedBy;
}

export interface CreateStockMovementRequest {
  productId: string;
  quantity: number;
  movementType: MovementType;
  reason: string;
}