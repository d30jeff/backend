-- DropForeignKey
ALTER TABLE "UserPermission" DROP CONSTRAINT "UserPermission_permissionID_fkey";

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "organizationID" TEXT;

-- CreateTable
CREATE TABLE "Picture" (
    "ID" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserPlan" (
    "ID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "planID" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPlan_userID_key" ON "UserPlan"("userID");

-- CreateIndex
CREATE INDEX "UserPlan_ID_userID_planID_createdAt_updatedAt_idx" ON "UserPlan"("ID", "userID", "planID", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_permissionID_fkey" FOREIGN KEY ("permissionID") REFERENCES "Permission"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
