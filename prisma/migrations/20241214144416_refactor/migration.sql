/*
  Warnings:

  - You are about to drop the column `accountID` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Branches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userID]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appearance` to the `Preference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_accountID_fkey";

-- DropForeignKey
ALTER TABLE "Provider" DROP CONSTRAINT "Provider_accountID_fkey";

-- DropIndex
DROP INDEX "Profile_ID_gender_dateOfBirth_accountID_idx";

-- DropIndex
DROP INDEX "Profile_accountID_key";

-- AlterTable
ALTER TABLE "Preference" ADD COLUMN     "appearance" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "accountID",
ADD COLUMN     "userID" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Branches";

-- DropTable
DROP TABLE "Provider";

-- CreateTable
CREATE TABLE "User" (
    "ID" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Branch" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "User_ID_type_email_idx" ON "User"("ID", "type", "email");

-- CreateIndex
CREATE UNIQUE INDEX "User_type_email_key" ON "User"("type", "email");

-- CreateIndex
CREATE INDEX "Branch_ID_name_createdAt_updatedAt_idx" ON "Branch"("ID", "name", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userID_key" ON "Profile"("userID");

-- CreateIndex
CREATE INDEX "Profile_ID_gender_dateOfBirth_userID_idx" ON "Profile"("ID", "gender", "dateOfBirth", "userID");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
