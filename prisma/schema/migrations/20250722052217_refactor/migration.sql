/*
  Warnings:

  - You are about to drop the column `entityID` on the `WorkspaceMember` table. All the data in the column will be lost.
  - You are about to drop the `WorkspaceMemberPermission` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workspaceID,userID,roleID]` on the table `WorkspaceMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workspaceID` to the `WorkspaceMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_entityID_fkey";

-- DropIndex
DROP INDEX "WorkspaceMember_entityID_userID_roleID_idx";

-- DropIndex
DROP INDEX "WorkspaceMember_entityID_userID_roleID_key";

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP COLUMN "entityID",
ADD COLUMN     "workspaceID" TEXT NOT NULL;

-- DropTable
DROP TABLE "WorkspaceMemberPermission";

-- CreateIndex
CREATE INDEX "WorkspaceMember_workspaceID_userID_roleID_idx" ON "WorkspaceMember"("workspaceID", "userID", "roleID");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_workspaceID_userID_roleID_key" ON "WorkspaceMember"("workspaceID", "userID", "roleID");

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceID_fkey" FOREIGN KEY ("workspaceID") REFERENCES "Workspace"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
