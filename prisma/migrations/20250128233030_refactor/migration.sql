/*
  Warnings:

  - Made the column `planID` on table `PlanPrice` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('INCOME', 'EXPENSE');

-- DropForeignKey
ALTER TABLE "PlanPrice" DROP CONSTRAINT "PlanPrice_planID_fkey";

-- DropIndex
DROP INDEX "PlanPrice_ID_stripeID_currency_interval_idx";

-- AlterTable
ALTER TABLE "PlanPrice" ALTER COLUMN "planID" SET NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" "Type" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "PlanPrice_ID_stripeID_planID_currency_interval_createdAt_up_idx" ON "PlanPrice"("ID", "stripeID", "planID", "currency", "interval", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Transaction_ID_type_amount_accountID_createdAt_updatedAt_idx" ON "Transaction"("ID", "type", "amount", "accountID", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
