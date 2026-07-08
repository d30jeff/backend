-- DropForeignKey
ALTER TABLE "FeatureActionPlanLimit" DROP CONSTRAINT "FeatureActionPlanLimit_featureActionID_fkey";

-- AddForeignKey
ALTER TABLE "FeatureActionPlanLimit" ADD CONSTRAINT "FeatureActionPlanLimit_featureActionID_fkey" FOREIGN KEY ("featureActionID") REFERENCES "FeatureAction"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
