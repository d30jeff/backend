/*
  Warnings:

  - You are about to drop the column `entityID` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `organizationID` on the `OrganizationTransaction` table. All the data in the column will be lost.
  - You are about to drop the `Entity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntityMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EntityMemberPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workspaceID` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `isActive` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_entityID_fkey";

-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_createdByUserID_fkey";

-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_parentID_fkey";

-- DropForeignKey
ALTER TABLE "Entity" DROP CONSTRAINT "Entity_updatedByUserID_fkey";

-- DropForeignKey
ALTER TABLE "EntityMember" DROP CONSTRAINT "EntityMember_entityID_fkey";

-- DropForeignKey
ALTER TABLE "EntityMember" DROP CONSTRAINT "EntityMember_roleID_fkey";

-- DropForeignKey
ALTER TABLE "EntityMember" DROP CONSTRAINT "EntityMember_userID_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_createdByUserID_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_industryID_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_updatedByUserID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationAccount" DROP CONSTRAINT "OrganizationAccount_createdByUserID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationAccount" DROP CONSTRAINT "OrganizationAccount_organizationID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationAccount" DROP CONSTRAINT "OrganizationAccount_updatedByUserID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationPlan" DROP CONSTRAINT "OrganizationPlan_organizationID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationPlan" DROP CONSTRAINT "OrganizationPlan_ownerID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationPlan" DROP CONSTRAINT "OrganizationPlan_planID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationTransaction" DROP CONSTRAINT "OrganizationTransaction_organizationID_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_moduleID_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_organizationID_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleID_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userID_fkey";

-- DropIndex
DROP INDEX "Address_ID_postcode_countryID_stateID_cityID_idx";

-- DropIndex
DROP INDEX "OrganizationTransaction_ID_transactionID_organizationID_cre_idx";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "entityID",
ADD COLUMN     "workspaceID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OrganizationTransaction" DROP COLUMN "organizationID";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isActive" SET NOT NULL;

-- DropTable
DROP TABLE "Entity";

-- DropTable
DROP TABLE "EntityMember";

-- DropTable
DROP TABLE "EntityMemberPermission";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "OrganizationAccount";

-- DropTable
DROP TABLE "OrganizationPlan";

-- DropTable
DROP TABLE "Picture";

-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "Attachment" (
    "ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "FeaturePermission" (
    "ID" TEXT NOT NULL,

    CONSTRAINT "FeaturePermission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "WorkspaceMemberPermission" (
    "ID" TEXT NOT NULL,
    "workspaceMemberID" TEXT NOT NULL,
    "featurePermissionID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkspaceMemberPermission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "WorkspaceMember" (
    "ID" TEXT NOT NULL,
    "entityID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "roleID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdByUserID" TEXT,
    "updatedByUserID" TEXT,
    "parentID" TEXT,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "Attachment_type_createdAt_updatedAt_idx" ON "Attachment"("type", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "WorkspaceMemberPermission_workspaceMemberID_featurePermissi_idx" ON "WorkspaceMemberPermission"("workspaceMemberID", "featurePermissionID");

-- CreateIndex
CREATE INDEX "WorkspaceMember_entityID_userID_roleID_idx" ON "WorkspaceMember"("entityID", "userID", "roleID");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_entityID_userID_roleID_key" ON "WorkspaceMember"("entityID", "userID", "roleID");

-- CreateIndex
CREATE INDEX "Workspace_name_type_createdAt_updatedAt_isActive_idx" ON "Workspace"("name", "type", "createdAt", "updatedAt", "isActive");

-- CreateIndex
CREATE INDEX "Address_postcode_countryID_stateID_cityID_createdAt_updated_idx" ON "Address"("postcode", "countryID", "stateID", "cityID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "OrganizationTransaction_ID_transactionID_createdAt_updatedA_idx" ON "OrganizationTransaction"("ID", "transactionID", "createdAt", "updatedAt", "createdByUserID", "updatedByUserID");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_workspaceID_fkey" FOREIGN KEY ("workspaceID") REFERENCES "Workspace"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_entityID_fkey" FOREIGN KEY ("entityID") REFERENCES "Workspace"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Workspace"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
