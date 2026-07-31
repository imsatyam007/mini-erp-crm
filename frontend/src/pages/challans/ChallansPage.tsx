import { useEffect, useState } from "react";

import type {
  SalesChallan,
  CreateChallanRequest,
} from "@/types/challan";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

import useChallans from "@/hooks/useChallans";

import ChallanTable from "./components/ChallanTable";
import ChallanForm from "./ChallanForm";
import ChallanViewModal from "./components/ChallanViewModal";

export default function ChallansPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [selectedChallan, setSelectedChallan] =
    useState<SalesChallan | null>(null);

const {
  challans,
  loading,
  fetchChallans,
  createChallan,
  updateChallan,
  cancelChallan,
} = useChallans();

  useEffect(() => {
    fetchChallans();
  }, [fetchChallans]);

  const handleView = (challan: SalesChallan) => {

    console.log("View clicked", challan);

    setSelectedChallan(challan);
    setIsViewOpen(true);
  };

  const handleEdit = (challan: SalesChallan) => {
    setSelectedChallan(challan);
    setIsOpen(true);
  };

  const handleCancel = async (
    challan: SalesChallan
  ) => {
    try {
      await cancelChallan(challan.id);
      await fetchChallans();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (
    data: CreateChallanRequest
  ) => {
    try {
      if (selectedChallan) {
        await updateChallan(selectedChallan.id, {
          customerId: data.customerId,
          status: data.status ?? "DRAFT",
          items: data.items,
       });
      } else {
       await createChallan(data);
      }

      await fetchChallans();
      setIsOpen(false);
      setSelectedChallan(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Sales Challans</CardTitle>

          <Button
            variant="primary"
            onClick={() => {
              setSelectedChallan(null);
              setIsOpen(true);
            }}
          >
            + New Challan
          </Button>
        </CardHeader>

        <CardContent>
          <ChallanTable
            challans={challans}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>

      <Modal
        open={isOpen}
        title={
          selectedChallan
            ? "Edit Challan"
            : "Create Challan"
        }
        onClose={() => {
          setIsOpen(false);
          setSelectedChallan(null);
        }}
      >
        <ChallanForm
          challan={selectedChallan ?? undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsOpen(false);
            setSelectedChallan(null);
          }}
        />
        <ChallanViewModal
           open={isViewOpen}
           challan={selectedChallan}
           onClose={() => {
             setIsViewOpen(false);
             setSelectedChallan(null);
           }}
          />
      </Modal>
       <ChallanViewModal
          open={isViewOpen}
           challan={selectedChallan}
           onClose={() => {
             setIsViewOpen(false);
             setSelectedChallan(null);
           }}
       />
    </>
  );
}