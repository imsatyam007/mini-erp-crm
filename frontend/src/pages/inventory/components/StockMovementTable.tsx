import type { StockMovement } from "@/types/stockMovement";

interface StockMovementTableProps {
  stockMovements: StockMovement[];
  loading: boolean;
}

export default function StockMovementTable({
  stockMovements,
  loading,
}: StockMovementTableProps) {
  if (loading) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-text">Loading stock movements...</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Movement</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Created By</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {stockMovements.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No stock movements found.
                </td>
              </tr>
            ) : (
              stockMovements.map((movement) => (
                <tr
                  key={movement.id}
                  className="border-b border-border hover:bg-background transition-colors"
                >
                  <td className="px-4 py-3 font-medium">
                    {movement.product.name}
                  </td>

                  <td className="px-4 py-3">
                    {movement.product.sku}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        movement.movementType === "IN"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {movement.movementType}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {movement.quantity}
                  </td>

                  <td className="px-4 py-3">
                    {movement.reason}
                  </td>

                  <td className="px-4 py-3">
                    {movement.createdBy.name}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(
                      movement.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}