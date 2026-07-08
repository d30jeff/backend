-- DropForeignKey
ALTER TABLE "UserPermission" DROP CONSTRAINT "UserPermission_userID_fkey";

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
