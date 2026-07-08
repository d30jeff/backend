/*
  Warnings:

  - Added the required column `updatedAt` to the `OrganizationAccount` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OrganizationAccount_ID_accountID_organizationID_idx";

-- AlterTable
ALTER TABLE "OrganizationAccount" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "OrganizationAccount_ID_accountID_organizationID_createdAt_u_idx" ON "OrganizationAccount"("ID", "accountID", "organizationID", "createdAt", "updatedAt", "deletedAt");
