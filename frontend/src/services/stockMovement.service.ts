import axiosInstance from "@/api/axios";
import type {
  CreateStockMovementRequest,
  StockMovement,
} from "@/types/stockMovement";

interface StockMovementResponse {
  success: boolean;
  data: StockMovement;
  message: string;
}

interface StockMovementsResponse {
  success: boolean;
  data: StockMovement[];
}

export const stockMovementService = {
  async getAll(): Promise<StockMovement[]> {
    const response = await axiosInstance.get<StockMovementsResponse>(
      "/stock-movements"
    );

    return response.data.data;
  },

  async getById(id: string): Promise<StockMovement> {
    const response = await axiosInstance.get<StockMovementResponse>(
      `/stock-movements/${id}`
    );

    return response.data.data;
  },

  async create(
    data: CreateStockMovementRequest
  ): Promise<StockMovement> {
    const response = await axiosInstance.post<StockMovementResponse>(
      "/stock-movements",
      data
    );

    return response.data.data;
  },
};