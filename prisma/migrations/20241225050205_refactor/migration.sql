/*
  Warnings:

  - A unique constraint covering the columns `[userID,roleID]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moduleID` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "moduleID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userID_roleID_key" ON "UserRole"("userID", "roleID");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
