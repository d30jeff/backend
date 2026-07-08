/*
  Warnings:

  - You are about to drop the column `type` on the `Workspace` table. All the data in the column will be lost.
  - Added the required column `moduleID` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Workspace_name_type_createdAt_updatedAt_isActive_idx";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "type",
ADD COLUMN     "moduleID" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Workspace_name_moduleID_createdAt_updatedAt_isActive_idx" ON "Workspace"("name", "moduleID", "createdAt", "updatedAt", "isActive");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
