/*
  Warnings:

  - A unique constraint covering the columns `[userID]` on the table `Preference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locale` to the `Preference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Preference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `Preference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preference" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locale" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Module" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Resource" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleID" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Action" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Permission" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleID" TEXT NOT NULL,
    "resourceID" TEXT NOT NULL,
    "actionID" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserPermission" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "permissionID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Account" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "excludeFromBalance" BOOLEAN NOT NULL DEFAULT false,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "TransactionCategory" (
    "ID" TEXT NOT NULL,

    CONSTRAINT "TransactionCategory_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "ID" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionCategoryID" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "Module_ID_createdAt_updatedAt_idx" ON "Module"("ID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Resource_ID_moduleID_createdAt_updatedAt_idx" ON "Resource"("ID", "moduleID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Action_ID_createdAt_updatedAt_idx" ON "Action"("ID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Permission_ID_moduleID_resourceID_actionID_createdAt_update_idx" ON "Permission"("ID", "moduleID", "resourceID", "actionID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_moduleID_resourceID_actionID_key" ON "Permission"("moduleID", "resourceID", "actionID");

-- CreateIndex
CREATE INDEX "UserPermission_ID_idx" ON "UserPermission"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermission_permissionID_userID_key" ON "UserPermission"("permissionID", "userID");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userID_key" ON "Account"("userID");

-- CreateIndex
CREATE INDEX "Account_ID_userID_createdAt_updatedAt_idx" ON "Account"("ID", "userID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userID_key" ON "Preference"("userID");

-- CreateIndex
CREATE INDEX "Preference_ID_userID_idx" ON "Preference"("ID", "userID");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_resourceID_fkey" FOREIGN KEY ("resourceID") REFERENCES "Resource"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_actionID_fkey" FOREIGN KEY ("actionID") REFERENCES "Action"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_permissionID_fkey" FOREIGN KEY ("permissionID") REFERENCES "Permission"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
