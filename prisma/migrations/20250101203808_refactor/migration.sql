/*
  Warnings:

  - A unique constraint covering the columns `[code,moduleID]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Role_ID_name_code_idx";

-- DropIndex
DROP INDEX "Role_name_code_moduleID_key";

-- CreateIndex
CREATE INDEX "Role_ID_code_moduleID_createdAt_updatedAt_idx" ON "Role"("ID", "code", "moduleID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_moduleID_key" ON "Role"("code", "moduleID");
