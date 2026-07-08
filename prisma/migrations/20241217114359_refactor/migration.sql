-- DropIndex
DROP INDEX "Account_userID_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionExpiresAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "UserSubscriptionHistory" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubscriptionHistory_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "UserSubscriptionHistory_ID_idx" ON "UserSubscriptionHistory"("ID");
