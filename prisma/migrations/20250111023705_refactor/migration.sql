/*
  Warnings:

  - You are about to drop the `FeatureLimit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeatureLimit" DROP CONSTRAINT "FeatureLimit_featureActionID_fkey";

-- DropForeignKey
ALTER TABLE "FeatureLimit" DROP CONSTRAINT "FeatureLimit_planID_fkey";

-- DropTable
DROP TABLE "FeatureLimit";

-- CreateTable
CREATE TABLE "FeatureActionPlanLimit" (
    "ID" TEXT NOT NULL,
    "featureActionID" TEXT NOT NULL,
    "planID" TEXT NOT NULL,
    "limit" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureActionPlanLimit_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "FeatureActionPlanLimit_ID_featureActionID_planID_idx" ON "FeatureActionPlanLimit"("ID", "featureActionID", "planID");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureActionPlanLimit_featureActionID_planID_key" ON "FeatureActionPlanLimit"("featureActionID", "planID");

-- AddForeignKey
ALTER TABLE "FeatureActionPlanLimit" ADD CONSTRAINT "FeatureActionPlanLimit_featureActionID_fkey" FOREIGN KEY ("featureActionID") REFERENCES "FeatureAction"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureActionPlanLimit" ADD CONSTRAINT "FeatureActionPlanLimit_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
