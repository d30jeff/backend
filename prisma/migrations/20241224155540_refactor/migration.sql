/*
  Warnings:

  - A unique constraint covering the columns `[name,code,moduleID]` on the table `Role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Role_code_key";

-- DropIndex
DROP INDEX "Role_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_code_moduleID_key" ON "Role"("name", "code", "moduleID");
