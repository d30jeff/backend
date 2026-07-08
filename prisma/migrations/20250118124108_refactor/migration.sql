/*
  Warnings:

  - A unique constraint covering the columns `[userID,roleID,moduleID,organizationID]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserRole_userID_roleID_moduleID_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userID_roleID_moduleID_organizationID_key" ON "UserRole"("userID", "roleID", "moduleID", "organizationID");
