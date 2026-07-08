/*
  Warnings:

  - A unique constraint covering the columns `[moduleID,featureID,actionID,roleID]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Permission_moduleID_featureID_actionID_key";

-- CreateIndex
CREATE UNIQUE INDEX "Permission_moduleID_featureID_actionID_roleID_key" ON "Permission"("moduleID", "featureID", "actionID", "roleID");
