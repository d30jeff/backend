/*
  Warnings:

  - A unique constraint covering the columns `[organizationID]` on the table `OrganizationPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrganizationPlan_organizationID_key" ON "OrganizationPlan"("organizationID");
