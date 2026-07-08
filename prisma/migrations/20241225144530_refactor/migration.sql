-- DropForeignKey
ALTER TABLE "FeatureAction" DROP CONSTRAINT "FeatureAction_actionID_fkey";

-- DropForeignKey
ALTER TABLE "FeatureAction" DROP CONSTRAINT "FeatureAction_featureID_fkey";

-- AddForeignKey
ALTER TABLE "FeatureAction" ADD CONSTRAINT "FeatureAction_featureID_fkey" FOREIGN KEY ("featureID") REFERENCES "Feature"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureAction" ADD CONSTRAINT "FeatureAction_actionID_fkey" FOREIGN KEY ("actionID") REFERENCES "Action"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
