import { Eye, Pencil, Trash2 } from "lucide-react";

import  { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import type { Customer } from "@/types/customer";

interface CustomerRowProps {
  customer: Customer;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export default function CustomerRow({
  customer,
  onView,
  onEdit,
  onDelete,
}: CustomerRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{customer.name}</td>

      <td className="px-4 py-3">{customer.businessName}</td>

      <td className="px-4 py-3">{customer.mobile}</td>

      <td className="px-4 py-3">
        <Badge>{customer.customerType}</Badge>
      </td>

      <td className="px-4 py-3">
        <Badge>{customer.status}</Badge>
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onView(customer)}>
            <Eye size={16} />
          </Button>

          <Button variant="primary" onClick={() => onEdit(customer)}>
            <Pencil size={16} />
          </Button>

          <Button variant="danger" onClick={() => onDelete(customer)}>
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}