/*
  Warnings:

  - You are about to drop the column `userID` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userID_fkey";

-- DropIndex
DROP INDEX "Account_ID_userID_createdAt_updatedAt_idx";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "userID";

-- CreateIndex
CREATE INDEX "Account_ID_balance_createdAt_updatedAt_idx" ON "Account"("ID", "balance", "createdAt", "updatedAt");
