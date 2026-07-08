/*
  Warnings:

  - A unique constraint covering the columns `[code,moduleID]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Action_name_code_key";

-- DropIndex
DROP INDEX "Action_name_key";

-- DropIndex
DROP INDEX "Feature_name_code_moduleID_key";

-- DropIndex
DROP INDEX "Module_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Feature_code_moduleID_key" ON "Feature"("code", "moduleID");
