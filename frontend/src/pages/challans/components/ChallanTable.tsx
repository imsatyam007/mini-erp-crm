import ChallanRow from "./ChallanRow";

import type { SalesChallan } from "@/types/challan";

interface ChallanTableProps {
  challans: SalesChallan[];
  loading: boolean;
  onView: (challan: SalesChallan) => void;
  onEdit: (challan: SalesChallan) => void;
  onCancel: (challan: SalesChallan) => void;
}

export default function ChallanTable({
  challans,
  loading,
  onView,
  onEdit,
  onCancel,
}: ChallanTableProps) {
  if (loading) {
    return (
      <div className="py-8 text-center">
        Loading challans...
      </div>
    );
  }

  if (!challans || challans.length === 0) {
    return (
      <div className="py-8 text-center">
        No challans found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="min-w-full">
        <thead className="border-b border-border bg-surface">
          <tr>
            <th className="px-4 py-3 text-left">
              Challan No
            </th>

            <th className="px-4 py-3 text-left">
              Customer
            </th>

            <th className="px-4 py-3 text-left">
              Quantity
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Created
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {challans.map((challan) => (
            <ChallanRow
              key={challan.id}
              challan={challan}
              onView={onView}
              onEdit={onEdit}
              onCancel={onCancel}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}