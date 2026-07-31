/*
  Warnings:

  - You are about to drop the column `sku` on the `SalesChallanItem` table. All the data in the column will be lost.
  - Added the required column `productSku` to the `SalesChallanItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalesChallan" ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "SalesChallanItem" DROP COLUMN "sku",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "productSku" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "SalesChallan_status_idx" ON "SalesChallan"("status");
