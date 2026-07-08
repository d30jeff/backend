-- CreateTable
CREATE TABLE "OrganizationPlan" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationID" TEXT NOT NULL,
    "planID" TEXT NOT NULL,

    CONSTRAINT "OrganizationPlan_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrganizationUser" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "roleID" TEXT NOT NULL,

    CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationPlan_organizationID_key" ON "OrganizationPlan"("organizationID");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationPlan_planID_key" ON "OrganizationPlan"("planID");

-- CreateIndex
CREATE INDEX "OrganizationPlan_ID_organizationID_planID_idx" ON "OrganizationPlan"("ID", "organizationID", "planID");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationPlan_organizationID_planID_key" ON "OrganizationPlan"("organizationID", "planID");

-- CreateIndex
CREATE INDEX "OrganizationUser_ID_organizationID_userID_createdAt_updated_idx" ON "OrganizationUser"("ID", "organizationID", "userID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUser_organizationID_userID_roleID_key" ON "OrganizationUser"("organizationID", "userID", "roleID");

-- AddForeignKey
ALTER TABLE "OrganizationPlan" ADD CONSTRAINT "OrganizationPlan_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationPlan" ADD CONSTRAINT "OrganizationPlan_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
