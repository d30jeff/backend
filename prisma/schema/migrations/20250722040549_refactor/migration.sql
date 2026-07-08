/*
  Warnings:

  - You are about to drop the column `actionID` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `featureID` on the `Permission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moduleID,featureActionID,roleID]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `featureActionID` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_actionID_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_featureID_fkey";

-- DropIndex
DROP INDEX "Permission_ID_moduleID_featureID_actionID_createdAt_updated_idx";

-- DropIndex
DROP INDEX "Permission_moduleID_featureID_actionID_roleID_key";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "actionID",
DROP COLUMN "featureID",
ADD COLUMN     "featureActionID" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Permission_ID_moduleID_featureActionID_createdAt_updatedAt_idx" ON "Permission"("ID", "moduleID", "featureActionID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_moduleID_featureActionID_roleID_key" ON "Permission"("moduleID", "featureActionID", "roleID");

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_featureActionID_fkey" FOREIGN KEY ("featureActionID") REFERENCES "FeatureAction"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
