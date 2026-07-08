/*
  Warnings:

  - Added the required column `countryID` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "countryID" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "State" ADD COLUMN     "isActive" BOOLEAN DEFAULT false;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
