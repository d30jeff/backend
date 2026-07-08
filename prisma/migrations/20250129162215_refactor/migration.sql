/*
  Warnings:

  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Transaction_ID_type_amount_accountID_createdAt_updatedAt_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "type";

-- DropEnum
DROP TYPE "Type";

-- CreateTable
CREATE TABLE "TransactionAttachment" (
    "ID" TEXT NOT NULL,
    "transactionID" TEXT NOT NULL,
    "uploadID" TEXT NOT NULL,

    CONSTRAINT "TransactionAttachment_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "Transaction_ID_amount_accountID_createdAt_updatedAt_idx" ON "Transaction"("ID", "amount", "accountID", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "TransactionAttachment" ADD CONSTRAINT "TransactionAttachment_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionAttachment" ADD CONSTRAINT "TransactionAttachment_uploadID_fkey" FOREIGN KEY ("uploadID") REFERENCES "Upload"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
