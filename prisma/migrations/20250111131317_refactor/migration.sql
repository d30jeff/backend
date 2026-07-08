/*
  Warnings:

  - You are about to drop the column `amount` on the `PlanPrice` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `PlanPrice` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `PlanPrice` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PlanPrice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeID]` on the table `PlanPrice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currency` to the `PlanPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interval` to the `PlanPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeID` to the `PlanPrice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlanPrice" DROP CONSTRAINT "PlanPrice_planID_fkey";

-- DropIndex
DROP INDEX "PlanPrice_ID_name_code_createdAt_updatedAt_isActive_planID_idx";

-- DropIndex
DROP INDEX "PlanPrice_code_key";

-- DropIndex
DROP INDEX "PlanPrice_name_key";

-- AlterTable
ALTER TABLE "PlanPrice" DROP COLUMN "amount",
DROP COLUMN "code",
DROP COLUMN "isActive",
DROP COLUMN "name",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "interval" TEXT NOT NULL,
ADD COLUMN     "stripeID" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "planID" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PlanPrice_stripeID_key" ON "PlanPrice"("stripeID");

-- CreateIndex
CREATE INDEX "PlanPrice_ID_stripeID_currency_interval_idx" ON "PlanPrice"("ID", "stripeID", "currency", "interval");

-- AddForeignKey
ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
