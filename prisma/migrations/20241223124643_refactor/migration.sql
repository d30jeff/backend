/*
  Warnings:

  - A unique constraint covering the columns `[name,code]` on the table `Action` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Action_ID_createdAt_updatedAt_idx";

-- CreateTable
CREATE TABLE "FeatureAction" (
    "ID" TEXT NOT NULL,
    "featureID" TEXT NOT NULL,
    "actionID" TEXT NOT NULL,

    CONSTRAINT "FeatureAction_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeatureAction_featureID_actionID_key" ON "FeatureAction"("featureID", "actionID");

-- CreateIndex
CREATE INDEX "Action_ID_name_code_createdAt_updatedAt_idx" ON "Action"("ID", "name", "code", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_code_key" ON "Action"("name", "code");

-- AddForeignKey
ALTER TABLE "FeatureAction" ADD CONSTRAINT "FeatureAction_featureID_fkey" FOREIGN KEY ("featureID") REFERENCES "Feature"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureAction" ADD CONSTRAINT "FeatureAction_actionID_fkey" FOREIGN KEY ("actionID") REFERENCES "Action"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
