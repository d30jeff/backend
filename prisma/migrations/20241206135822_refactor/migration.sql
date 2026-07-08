/*
  Warnings:

  - You are about to drop the column `consumerID` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consumer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConsumerProvider` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accountID]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountID` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessProvider" DROP CONSTRAINT "BusinessProvider_businessID_fkey";

-- DropForeignKey
ALTER TABLE "ConsumerProvider" DROP CONSTRAINT "ConsumerProvider_consumerID_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_consumerID_fkey";

-- DropIndex
DROP INDEX "Profile_ID_gender_dateOfBirth_consumerID_idx";

-- DropIndex
DROP INDEX "Profile_consumerID_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "consumerID",
ADD COLUMN     "accountID" TEXT NOT NULL,
ADD COLUMN     "profileCompletedAt" TIMESTAMP(3),
ALTER COLUMN "gender" DROP NOT NULL;

-- DropTable
DROP TABLE "Business";

-- DropTable
DROP TABLE "BusinessProvider";

-- DropTable
DROP TABLE "Consumer";

-- DropTable
DROP TABLE "ConsumerProvider";

-- CreateTable
CREATE TABLE "Account" (
    "ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Provider" (
    "ID" TEXT NOT NULL,
    "accountID" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Preference" (
    "ID" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Expense" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE INDEX "Account_ID_type_email_idx" ON "Account"("ID", "type", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_type_email_key" ON "Account"("type", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_externalID_key" ON "Provider"("externalID");

-- CreateIndex
CREATE INDEX "Provider_ID_accountID_provider_externalID_idx" ON "Provider"("ID", "accountID", "provider", "externalID");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_accountID_provider_key" ON "Provider"("accountID", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_accountID_key" ON "Profile"("accountID");

-- CreateIndex
CREATE INDEX "Profile_ID_gender_dateOfBirth_accountID_idx" ON "Profile"("ID", "gender", "dateOfBirth", "accountID");

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
