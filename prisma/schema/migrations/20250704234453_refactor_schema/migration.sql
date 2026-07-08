/*
  Warnings:

  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.
  - You are about to drop the column `accountID` on the `OrganizationAccount` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationID]` on the table `OrganizationAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entityID` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrganizationAccount" DROP CONSTRAINT "OrganizationAccount_accountID_fkey";

-- DropIndex
DROP INDEX "OrganizationAccount_ID_accountID_organizationID_createdAt_u_idx";

-- DropIndex
DROP INDEX "OrganizationAccount_accountID_organizationID_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "entityID" TEXT NOT NULL,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "cityID" TEXT,
ADD COLUMN     "countryID" TEXT,
ADD COLUMN     "stateID" TEXT;

-- AlterTable
ALTER TABLE "OrganizationAccount" DROP COLUMN "accountID";

-- CreateTable
CREATE TABLE "Category" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "featureID" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "EntityMemberPermission" (
    "ID" TEXT NOT NULL,
    "entityMemberID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntityMemberPermission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "EntityMember" (
    "ID" TEXT NOT NULL,
    "entityID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "roleID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntityMember_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Entity" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdByUserID" TEXT,
    "updatedByUserID" TEXT,
    "parentID" TEXT,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_code_key" ON "Category"("code");

-- CreateIndex
CREATE INDEX "Category_code_idx" ON "Category"("code");

-- CreateIndex
CREATE INDEX "EntityMemberPermission_entityMemberID_idx" ON "EntityMemberPermission"("entityMemberID");

-- CreateIndex
CREATE INDEX "EntityMember_entityID_userID_roleID_idx" ON "EntityMember"("entityID", "userID", "roleID");

-- CreateIndex
CREATE UNIQUE INDEX "EntityMember_entityID_userID_roleID_key" ON "EntityMember"("entityID", "userID", "roleID");

-- CreateIndex
CREATE INDEX "Address_ID_postcode_countryID_stateID_cityID_idx" ON "Address"("ID", "postcode", "countryID", "stateID", "cityID");

-- CreateIndex
CREATE INDEX "OrganizationAccount_ID_organizationID_createdAt_updatedAt_d_idx" ON "OrganizationAccount"("ID", "organizationID", "createdAt", "updatedAt", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationAccount_organizationID_key" ON "OrganizationAccount"("organizationID");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_entityID_fkey" FOREIGN KEY ("entityID") REFERENCES "Entity"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_featureID_fkey" FOREIGN KEY ("featureID") REFERENCES "Feature"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityMember" ADD CONSTRAINT "EntityMember_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityMember" ADD CONSTRAINT "EntityMember_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityMember" ADD CONSTRAINT "EntityMember_entityID_fkey" FOREIGN KEY ("entityID") REFERENCES "Entity"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "Entity"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
