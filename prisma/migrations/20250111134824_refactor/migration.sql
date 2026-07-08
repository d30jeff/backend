/*
  Warnings:

  - Added the required column `moduleID` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "moduleID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
