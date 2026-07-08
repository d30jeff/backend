-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "industryID" TEXT;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_industryID_fkey" FOREIGN KEY ("industryID") REFERENCES "Industry"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
