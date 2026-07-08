/*
  Warnings:

  - You are about to drop the column `locale` on the `UserPreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[localeID]` on the table `UserPreference` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `localeID` to the `UserPreference` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserPreference_ID_userID_idx";

-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "locale",
ADD COLUMN     "localeID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_localeID_key" ON "UserPreference"("localeID");

-- CreateIndex
CREATE INDEX "UserPreference_ID_userID_localeID_createdAt_updatedAt_idx" ON "UserPreference"("ID", "userID", "localeID", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_localeID_fkey" FOREIGN KEY ("localeID") REFERENCES "Locale"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
