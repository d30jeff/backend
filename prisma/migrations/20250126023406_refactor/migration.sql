/*
  Warnings:

  - Added the required column `balance` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_createdByUserID_fkey";

-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_updatedByUserID_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "balance" MONEY NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Transaction" (
    "ID" TEXT NOT NULL,
    "accountID" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
