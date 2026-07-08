-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_updatedByUserID_fkey";

-- AlterTable
ALTER TABLE "Organization" ALTER COLUMN "updatedByUserID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
