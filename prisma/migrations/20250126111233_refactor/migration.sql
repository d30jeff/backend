/*
  Warnings:

  - You are about to drop the column `excludeFromBalance` on the `Account` table. All the data in the column will be lost.
  - You are about to alter the column `balance` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "excludeFromBalance",
ADD COLUMN     "excludeFromOverview" BOOLEAN DEFAULT false,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(65,30);
