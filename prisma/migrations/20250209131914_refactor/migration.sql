-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionCategoryID" TEXT;

-- CreateTable
CREATE TABLE "Currency" (
    "ID" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "TransactionCategory" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionCategory_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE INDEX "Currency_ID_code_idx" ON "Currency"("ID", "code");

-- CreateIndex
CREATE INDEX "TransactionCategory_ID_name_createdAt_updatedAt_idx" ON "TransactionCategory"("ID", "name", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionCategoryID_fkey" FOREIGN KEY ("transactionCategoryID") REFERENCES "TransactionCategory"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
