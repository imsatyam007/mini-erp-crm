import { useCallback, useState } from "react";

import challanService from "@/services/challan.service";

import type {
  SalesChallan,
  CreateChallanRequest,
  UpdateChallanRequest,
} from "@/types/challan";

export default function useChallans() {
  const [challans, setChallans] = useState<SalesChallan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchChallans = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await challanService.getChallans();

      setChallans(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load challans.");
    } finally {
      setLoading(false);
    }
  }, []);

  const searchChallans = useCallback(
    async (query: string) => {
      try {
        setLoading(true);
        setError("");

        if (!query.trim()) {
          await fetchChallans();
          return;
        }

        const data = await challanService.searchChallans(query);

        setChallans(data);
      } catch (err) {
        console.error(err);
        setError("Failed to search challans.");
      } finally {
        setLoading(false);
      }
    },
    [fetchChallans]
  );

  const getChallanById = useCallback(
    async (id: string): Promise<SalesChallan | null> => {
      try {
        setLoading(true);
        setError("");

        const challan = await challanService.getChallanById(id);

        return challan;
      } catch (err) {
        console.error(err);
        setError("Failed to fetch challan.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createChallan = useCallback(
    async (
      payload: CreateChallanRequest
    ): Promise<SalesChallan> => {
      try {
        setLoading(true);
        setError("");

        const challan =
          await challanService.createChallan(payload);

        await fetchChallans();

        return challan;
      } catch (err) {
        console.error(err);
        setError("Failed to create challan.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchChallans]
  );

  const updateChallan = useCallback(
    async (
      id: string,
      payload: UpdateChallanRequest
    ): Promise<SalesChallan> => {
      try {
        setLoading(true);
        setError("");

        const challan =
          await challanService.updateChallan(id, payload);

        await fetchChallans();

        return challan;
      } catch (err) {
        console.error(err);
        setError("Failed to update challan.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchChallans]
  );

  const cancelChallan = useCallback(
    async (id: string): Promise<SalesChallan> => {
      try {
        setLoading(true);
        setError("");

        const challan =
          await challanService.cancelChallan(id);

        await fetchChallans();

        return challan;
      } catch (err) {
        console.error(err);
        setError("Failed to cancel challan.");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchChallans]
  );

  return {
    challans,
    loading,
    error,
    fetchChallans,
    searchChallans,
    getChallanById,
    createChallan,
    updateChallan,
    cancelChallan,
  };
}