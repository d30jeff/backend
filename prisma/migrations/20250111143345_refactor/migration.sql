/*
  Warnings:

  - Added the required column `amountInCents` to the `PlanPrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlanPrice" ADD COLUMN     "amountInCents" INTEGER NOT NULL;
