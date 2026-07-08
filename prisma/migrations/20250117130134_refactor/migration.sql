/*
  Warnings:

  - Added the required column `ownerID` to the `OrganizationPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OrganizationPlan_ID_organizationID_planID_idx";

-- AlterTable
ALTER TABLE "OrganizationPlan" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "ownerID" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "OrganizationPlan_ID_organizationID_planID_expiresAt_ownerID_idx" ON "OrganizationPlan"("ID", "organizationID", "planID", "expiresAt", "ownerID");

-- AddForeignKey
ALTER TABLE "OrganizationPlan" ADD CONSTRAINT "OrganizationPlan_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
