-- DropForeignKey
ALTER TABLE "Upload" DROP CONSTRAINT "Upload_createdByUserID_fkey";

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
