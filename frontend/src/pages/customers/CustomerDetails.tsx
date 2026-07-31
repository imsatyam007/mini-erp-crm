import { Button } from "@/components/ui/Button";

import type { Customer } from "@/types/customer";

interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
}

export default function CustomerDetails({
  customer,
  onClose,
}: CustomerDetailsProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text">
          Customer Details
        </h2>

        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Detail label="Customer Name" value={customer.name} />
        <Detail label="Business Name" value={customer.businessName} />
        <Detail label="Mobile" value={customer.mobile} />
        <Detail label="Email" value={customer.email} />
        <Detail label="GST Number" value={customer.gstNumber} />
        <Detail label="Customer Type" value={customer.customerType} />
        <Detail label="Status" value={customer.status} />
        <Detail label="Follow-up Date" value={customer.followUpDate} />
      </div>

      <div className="mt-6">
        <Detail label="Address" value={customer.address} />
      </div>

      <div className="mt-6">
        <Detail label="Notes" value={customer.notes} />
      </div>
    </div>
  );
}

interface DetailProps {
  label: string;
  value?: string | null;
}

function Detail({ label, value }: DetailProps) {
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