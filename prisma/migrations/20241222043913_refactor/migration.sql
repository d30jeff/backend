/*
  Warnings:

  - You are about to drop the column `pictureURL` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionExpiresAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Organization_ID_name_createdAt_updatedAt_idx";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "tagline" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "pictureURL",
ADD COLUMN     "pictureUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptionExpiresAt";

-- CreateTable
CREATE TABLE "UserSubscription" (
    "ID" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrganizationRole" (
    "ID" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "businessID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "OrganizationRole_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "UserSubscription_ID_plan_expiresAt_createdAt_updatedAt_idx" ON "UserSubscription"("ID", "plan", "expiresAt", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "OrganizationRole_ID_role_businessID_userID_idx" ON "OrganizationRole"("ID", "role", "businessID", "userID");

-- CreateIndex
CREATE INDEX "Organization_ID_name_type_createdAt_updatedAt_idx" ON "Organization"("ID", "name", "type", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationRole" ADD CONSTRAINT "OrganizationRole_businessID_fkey" FOREIGN KEY ("businessID") REFERENCES "Organization"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationRole" ADD CONSTRAINT "OrganizationRole_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
