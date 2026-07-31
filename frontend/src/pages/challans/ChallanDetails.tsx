import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import type { SalesChallan } from "@/types/challan";

interface ChallanDetailsProps {
  challan: SalesChallan;
  onClose: () => void;
}

export default function ChallanDetails({
  challan,
  onClose,
}: ChallanDetailsProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text">
          Challan Details
        </h2>

        <Button
          variant="secondary"
          onClick={onClose}
        >
          Close
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Detail
          label="Challan Number"
          value={challan.challanNumber}
        />

        <Detail
          label="Customer"
          value={challan.customer.name}
        />

        <Detail
          label="Business Name"
          value={challan.customer.businessName}
        />

        <Detail
          label="Mobile"
          value={challan.customer.mobile}
        />

        <Detail
          label="Total Quantity"
          value={challan.totalQuantity.toString()}
        />

        <Detail
          label="Created On"
          value={new Date(
            challan.createdAt
          ).toLocaleString()}
        />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-text-secondary">
          Status
        </p>

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
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-lg font-semibold text-text">
          Products
        </h3>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="min-w-full">
            <thead className="border-b border-border bg-background">
              <tr>
                <th className="px-4 py-3 text-left">
                  Product
                </th>

                <th className="px-4 py-3 text-left">
                  SKU
                </th>

                <th className="px-4 py-3 text-left">
                  Quantity
                </th>

                <th className="px-4 py-3 text-left">
                  Unit Price
                </th>
              </tr>
            </thead>

            <tbody>
              {challan.items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-3">
                    {item.productName}
                  </td>

                  <td className="px-4 py-3">
                    {item.productSku}
                  </td>

                  <td className="px-4 py-3">
                    {item.quantity}
                  </td>

                  <td className="px-4 py-3">
                    ₹{item.unitPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface DetailProps {
  label: string;
  value?: string | null;
}

function Detail({
  label,
  value,
}: DetailProps) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-text-secondary">
        {label}
      </p>

      <p className="rounded-md border border-border bg-background px-3 py-2 text-text">
        {value || "-"}
      </p>
    </div>
  );
}