-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_moduleID_fkey";

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
