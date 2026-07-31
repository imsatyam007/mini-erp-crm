import { useCallback, useEffect, useState } from "react";
import { stockMovementService } from "@/services/stockMovement.service";
import type {
  CreateStockMovementRequest,
  StockMovement,
} from "@/types/stockMovement";

export function useStockMovements() {
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStockMovements = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await stockMovementService.getAll();
      setStockMovements(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to fetch stock movements."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStockMovements();
  }, [fetchStockMovements]);

  const createStockMovement = async (
    payload: CreateStockMovementRequest
  ) => {
    try {
      setLoading(true);
      setError("");

      await stockMovementService.create(payload);

      await fetchStockMovements();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to create stock movement."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    stockMovements,
    loading,
    error,
    fetchStockMovements,
    createStockMovement,
  };
}