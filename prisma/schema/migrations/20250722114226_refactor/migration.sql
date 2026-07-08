-- DropIndex
DROP INDEX "UserPermission_ID_idx";

-- CreateIndex
CREATE INDEX "UserPermission_permissionID_userID_idx" ON "UserPermission"("permissionID", "userID");
