/*
  Warnings:

  - You are about to drop the column `accountID` on the `OrganizationTransaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrganizationTransaction" DROP CONSTRAINT "OrganizationTransaction_accountID_fkey";

-- AlterTable
ALTER TABLE "OrganizationTransaction" DROP COLUMN "accountID";
