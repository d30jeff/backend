/*
  Warnings:

  - You are about to drop the `OrganizationPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrganizationUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedByUserID` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_organizationID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_roleID_fkey";

-- DropForeignKey
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_userID_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "updatedByUserID" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrganizationPermission";

-- DropTable
DROP TABLE "OrganizationUser";

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
