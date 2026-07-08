/*
  Warnings:

  - A unique constraint covering the columns `[userID,roleID,moduleID]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserRole_userID_roleID_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rolesCreatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userID_roleID_moduleID_key" ON "UserRole"("userID", "roleID", "moduleID");
