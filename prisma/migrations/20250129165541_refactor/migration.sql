/*
  Warnings:

  - Added the required column `accountID` to the `OrganizationTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrganizationTransaction" ADD COLUMN     "accountID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
