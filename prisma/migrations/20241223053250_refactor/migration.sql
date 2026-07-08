/*
  Warnings:

  - You are about to drop the column `type` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the `OrganizationRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `industryID` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrganizationRole" DROP CONSTRAINT "OrganizationRole_organizationID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationRole" DROP CONSTRAINT "OrganizationRole_userID_fkey";

-- DropIndex
DROP INDEX "Organization_ID_name_type_createdAt_updatedAt_idx";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "type",
ADD COLUMN     "industryID" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrganizationRole";

-- CreateTable
CREATE TABLE "IndustryRole" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roleID" TEXT NOT NULL,
    "industryID" TEXT NOT NULL,

    CONSTRAINT "IndustryRole_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Industry" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrganizationPermission" (
    "ID" TEXT NOT NULL,

    CONSTRAINT "OrganizationPermission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PlanFeature" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "planID" TEXT NOT NULL,
    "featureID" TEXT NOT NULL,

    CONSTRAINT "PlanFeature_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Role" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "IndustryRole_ID_roleID_industryID_idx" ON "IndustryRole"("ID", "roleID", "industryID");

-- CreateIndex
CREATE UNIQUE INDEX "IndustryRole_roleID_industryID_key" ON "IndustryRole"("roleID", "industryID");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_name_key" ON "Industry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_code_key" ON "Industry"("code");

-- CreateIndex
CREATE INDEX "Industry_ID_name_code_createdAt_updatedAt_idx" ON "Industry"("ID", "name", "code", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "PlanFeature_ID_planID_featureID_idx" ON "PlanFeature"("ID", "planID", "featureID");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_key" ON "Role"("code");

-- CreateIndex
CREATE INDEX "Role_ID_name_code_idx" ON "Role"("ID", "name", "code");

-- CreateIndex
CREATE INDEX "Organization_ID_name_industryID_createdAt_updatedAt_idx" ON "Organization"("ID", "name", "industryID", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "IndustryRole" ADD CONSTRAINT "IndustryRole_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryRole" ADD CONSTRAINT "IndustryRole_industryID_fkey" FOREIGN KEY ("industryID") REFERENCES "Industry"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_industryID_fkey" FOREIGN KEY ("industryID") REFERENCES "Industry"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanFeature" ADD CONSTRAINT "PlanFeature_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanFeature" ADD CONSTRAINT "PlanFeature_featureID_fkey" FOREIGN KEY ("featureID") REFERENCES "Feature"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
