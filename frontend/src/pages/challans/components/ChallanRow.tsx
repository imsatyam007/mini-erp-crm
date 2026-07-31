import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import type { SalesChallan } from "@/types/challan";

interface ChallanRowProps {
  challan: SalesChallan;
  onView: (challan: SalesChallan) => void;
  onEdit: (challan: SalesChallan) => void;
  onCancel: (challan: SalesChallan) => void;
}

export default function ChallanRow({
  challan,
  onView,
  onEdit,
  onCancel,
}: ChallanRowProps) {
  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-4 py-3 font-medium">
        {challan.challanNumber}
      </td>

      <td className="px-4 py-3">
        {challan.customer.name}
      </td>

      <td className="px-4 py-3">
        {challan.totalQuantity}
      </td>

      <td className="px-4 py-3">
        <Badge
            variant={
                challan.status === "CONFIRMED"
                ? "success"
                : challan.status === "DRAFT"
                ? "warning"
                : "danger"
            }
            >
            {challan.status}
            </Badge>
      </td>

      <td className="px-4 py-3">
        {new Date(challan.createdAt).toLocaleDateString()}
      </td>

      <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            onClick={() => onView(challan)}
          >
            View
          </Button>

          {challan.status === "DRAFT" && (
            <Button
              variant="primary"
              onClick={() => onEdit(challan)}
            >
              Edit
            </Button>
          )}

          {challan.status !== "CANCELLED" && (
            <Button
              variant="danger"
              onClick={() => onCancel(challan)}
            >
              Cancel
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}