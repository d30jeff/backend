/*
  Warnings:

  - Added the required column `createdByUserID` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleID` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "createdByUserID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "roleID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserRole" (
    "ID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "roleID" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
