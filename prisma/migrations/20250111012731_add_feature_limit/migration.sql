/*
  Warnings:

  - Added the required column `updatedAt` to the `FeatureAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeatureAction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "FeatureLimit" (
    "ID" TEXT NOT NULL,
    "featureActionID" TEXT NOT NULL,
    "limit" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureLimit_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrganizationAccount" (
    "ID" TEXT NOT NULL,
    "accountID" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,

    CONSTRAINT "OrganizationAccount_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "FeatureLimit_ID_featureActionID_idx" ON "FeatureLimit"("ID", "featureActionID");

-- CreateIndex
CREATE INDEX "OrganizationAccount_ID_accountID_organizationID_idx" ON "OrganizationAccount"("ID", "accountID", "organizationID");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationAccount_accountID_organizationID_key" ON "OrganizationAccount"("accountID", "organizationID");

-- CreateIndex
CREATE INDEX "FeatureAction_ID_featureID_actionID_idx" ON "FeatureAction"("ID", "featureID", "actionID");

-- AddForeignKey
ALTER TABLE "FeatureLimit" ADD CONSTRAINT "FeatureLimit_featureActionID_fkey" FOREIGN KEY ("featureActionID") REFERENCES "FeatureAction"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
