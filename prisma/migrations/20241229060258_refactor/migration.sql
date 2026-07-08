/*
  Warnings:

  - You are about to drop the `Preference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Preference" DROP CONSTRAINT "Preference_userID_fkey";

-- DropTable
DROP TABLE "Preference";

-- CreateTable
CREATE TABLE "UserPreference" (
    "ID" TEXT NOT NULL,
    "appearance" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userID_key" ON "UserPreference"("userID");

-- CreateIndex
CREATE INDEX "UserPreference_ID_userID_idx" ON "UserPreference"("ID", "userID");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
