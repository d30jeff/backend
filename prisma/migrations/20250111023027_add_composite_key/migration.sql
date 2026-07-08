/*
  Warnings:

  - A unique constraint covering the columns `[featureActionID,planID]` on the table `FeatureLimit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeatureLimit_featureActionID_planID_key" ON "FeatureLimit"("featureActionID", "planID");
