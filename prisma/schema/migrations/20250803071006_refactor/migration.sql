-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_featureActionID_fkey";

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_featureActionID_fkey" FOREIGN KEY ("featureActionID") REFERENCES "FeatureAction"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
