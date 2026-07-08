-- AlterTable
ALTER TABLE "OrganizationAccount" ADD COLUMN     "createdByUserID" TEXT,
ADD COLUMN     "updatedByUserID" TEXT;

-- CreateTable
CREATE TABLE "OrganizationTransaction" (
    "ID" TEXT NOT NULL,
    "transactionID" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserID" TEXT,
    "updatedByUserID" TEXT,

    CONSTRAINT "OrganizationTransaction_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationTransaction_transactionID_key" ON "OrganizationTransaction"("transactionID");

-- CreateIndex
CREATE INDEX "OrganizationTransaction_ID_transactionID_organizationID_cre_idx" ON "OrganizationTransaction"("ID", "transactionID", "organizationID", "createdAt", "updatedAt", "createdByUserID", "updatedByUserID");

-- CreateIndex
CREATE INDEX "TransactionAttachment_ID_transactionID_uploadID_idx" ON "TransactionAttachment"("ID", "transactionID", "uploadID");

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
