import Modal from "@/components/ui/Modal/Modal";
import {
  Card,
  CardContent,
} from "@/components/ui/Card";

import type { SalesChallan } from "@/types/challan";

interface ChallanViewModalProps {
  open: boolean;
  challan: SalesChallan | null;
  onClose: () => void;
}

export default function ChallanViewModal({
  open,
  challan,
  onClose,
}: ChallanViewModalProps) {
  if (!challan) return null;

  console.log("ChallanViewModal", {
  open,
  challan,
});

  return (
    <Modal
      open={open}
      title={`Challan ${challan.challanNumber}`}
      onClose={onClose}
    >
      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Customer</p>
              <p>{challan.customer.name}</p>
            </div>

            <div>
              <p className="font-medium">Status</p>
              <p>{challan.status}</p>
            </div>

            <div>
              <p className="font-medium">Created</p>
              <p>
                {new Date(
                  challan.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="font-medium">
                Total Quantity
              </p>
              <p>{challan.totalQuantity}</p>
            </div>
          </div>

          <hr />

          <h3 className="text-lg font-semibold">
            Products
          </h3>

          <div className="space-y-4">
            {challan.items.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border p-4"
              >
                <p>
                  <strong>Name:</strong>{" "}
                  {item.productName}
                </p>

                <p>
                  <strong>SKU:</strong>{" "}
                  {item.productSku}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {item.quantity}
                </p>

                <p>
                  <strong>Price:</strong> ₹
                  {item.unitPrice}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
}