/*
  Warnings:

  - Added the required column `createdByUserID` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_workspaceID_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createdByUserID" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_workspaceID_fkey" FOREIGN KEY ("workspaceID") REFERENCES "Workspace"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
