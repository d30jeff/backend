/*
  Warnings:

  - Added the required column `planID` to the `FeatureLimit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FeatureLimit_ID_featureActionID_idx";

-- AlterTable
ALTER TABLE "FeatureLimit" ADD COLUMN     "planID" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "FeatureLimit_ID_featureActionID_planID_idx" ON "FeatureLimit"("ID", "featureActionID", "planID");

-- AddForeignKey
ALTER TABLE "FeatureLimit" ADD CONSTRAINT "FeatureLimit_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
