/*
  Warnings:

  - You are about to drop the column `description` on the `Module` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "UserRole" (
    "ID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "roleID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "UserRole_userID_roleID_idx" ON "UserRole"("userID", "roleID");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userID_roleID_key" ON "UserRole"("userID", "roleID");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
