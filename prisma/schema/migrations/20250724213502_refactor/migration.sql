-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_roleID_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_userID_fkey";

-- DropIndex
DROP INDEX "UserPreference_ID_userID_localeID_createdAt_updatedAt_idx";

-- CreateIndex
CREATE INDEX "UserPreference_userID_localeID_createdAt_updatedAt_idx" ON "UserPreference"("userID", "localeID", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
