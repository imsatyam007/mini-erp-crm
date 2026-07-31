import axiosInstance from "@/api/axios";

import type {
  SalesChallan,
  SalesChallanListResponse,
  SalesChallanResponse,
  CreateChallanRequest,
  UpdateChallanRequest,
} from "@/types/challan";

class ChallanService {
  async getChallans(): Promise<SalesChallan[]> {
    const { data } =
      await axiosInstance.get<SalesChallanListResponse>(
        "/challans"
      );

    return data.data;
  }

  async searchChallans(
    query: string
  ): Promise<SalesChallan[]> {
    const { data } =
      await axiosInstance.get<SalesChallanListResponse>(
        "/challans/search",
        {
          params: {
            q: query,
          },
        }
      );

    return data.data;
  }

  async getChallanById(
    id: string
  ): Promise<SalesChallan> {
    const { data } =
      await axiosInstance.get<SalesChallanResponse>(
        `/challans/${id}`
      );

    return data.data;
  }

  async createChallan(
    payload: CreateChallanRequest
  ): Promise<SalesChallan> {
    const { data } =
      await axiosInstance.post<SalesChallanResponse>(
        "/challans",
        payload
      );

    return data.data;
  }

  async updateChallan(
    id: string,
    payload: UpdateChallanRequest
  ): Promise<SalesChallan> {
    const { data } =
      await axiosInstance.patch<SalesChallanResponse>(
        `/challans/${id}`,
        payload
      );

    return data.data;
  }

  async cancelChallan(
    id: string
  ): Promise<SalesChallan> {
    const { data } =
      await axiosInstance.patch<SalesChallanResponse>(
        `/challans/${id}/cancel`
      );

    return data.data;
  }
}

export default new ChallanService();