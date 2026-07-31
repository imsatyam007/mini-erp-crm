import CustomerRow from "./CustomerRow";

import type { Customer } from "@/types/customer";

interface CustomerTableProps {
  customers: Customer[];
  loading: boolean;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export default function CustomerTable({
  customers,
  loading,
  onView,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  if (loading) {
    return (
      <div className="py-8 text-center">
        Loading customers...
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="py-8 text-center">
        No customers found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="min-w-full">
        <thead className="bg-surface border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Business</th>
            <th className="px-4 py-3 text-left">Mobile</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}