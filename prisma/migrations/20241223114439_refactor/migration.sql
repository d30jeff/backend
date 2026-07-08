/*
  Warnings:

  - A unique constraint covering the columns `[name,code,moduleID]` on the table `Feature` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Feature_name_code_moduleID_industryID_key";

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_code_moduleID_key" ON "Feature"("name", "code", "moduleID");
