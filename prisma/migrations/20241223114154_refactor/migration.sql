/*
  Warnings:

  - A unique constraint covering the columns `[name,code,moduleID,industryID]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `limit` to the `PlanFeature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleID` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Feature_code_key";

-- DropIndex
DROP INDEX "Feature_name_key";

-- DropIndex
DROP INDEX "Module_ID_createdAt_updatedAt_idx";

-- AlterTable
ALTER TABLE "PlanFeature" ADD COLUMN     "limit" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "moduleID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_code_moduleID_industryID_key" ON "Feature"("name", "code", "moduleID", "industryID");

-- CreateIndex
CREATE INDEX "Module_ID_name_code_createdAt_updatedAt_idx" ON "Module"("ID", "name", "code", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
