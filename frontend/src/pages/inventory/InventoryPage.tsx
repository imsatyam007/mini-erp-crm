import StockMovementForm from "./StockMovementForm";
import StockMovementTable from "./components/StockMovementTable";

import { useStockMovements } from "@/hooks/useStockMovements";

export default function InventoryPage() {
  const {
    stockMovements,
    loading,
    createStockMovement,
  } = useStockMovements();

  const handleCreateMovement = async (
    data: Parameters<typeof createStockMovement>[0]
  ) => {
    await createStockMovement(data);
    alert("Stock movement created successfully.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text">
          Inventory Management
        </h1>

        <p className="text-muted-foreground mt-1">
          Manage stock movements and monitor inventory.
        </p>
      </div>

      <StockMovementForm onSubmit={handleCreateMovement} />

      <StockMovementTable
        stockMovements={stockMovements}
        loading={loading}
      />
    </div>
  );
}