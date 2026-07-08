-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userID_fkey";

-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "claimedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
