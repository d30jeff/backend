-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_moduleID_fkey";

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
