-- DropForeignKey
ALTER TABLE "FeatureActionPlanLimit" DROP CONSTRAINT "FeatureActionPlanLimit_planID_fkey";

-- AddForeignKey
ALTER TABLE "FeatureActionPlanLimit" ADD CONSTRAINT "FeatureActionPlanLimit_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
