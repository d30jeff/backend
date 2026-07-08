-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleID_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userID_fkey";

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
