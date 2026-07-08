/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeCustomerID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerID_key" ON "User"("stripeCustomerID");
