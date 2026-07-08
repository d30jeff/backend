-- CreateTable
CREATE TABLE "Account" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "excludeFromBalance" BOOLEAN NOT NULL DEFAULT false,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Action" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Branch" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Feature" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleID" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Module" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrganizationRole" (
    "ID" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "OrganizationRole_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Organization" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tagline" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Permission" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleID" TEXT NOT NULL,
    "featureID" TEXT NOT NULL,
    "actionID" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PlanPrice" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "planID" TEXT NOT NULL,

    CONSTRAINT "PlanPrice_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Plan" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Preference" (
    "ID" TEXT NOT NULL,
    "appearance" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Profile" (
    "ID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "gender" TEXT,
    "pictureUrl" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "profileCompletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserPermission" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "permissionID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "ID" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,
    "planID" TEXT NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "User" (
    "ID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "moduleID" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "Account_ID_userID_createdAt_updatedAt_idx" ON "Account"("ID", "userID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Action_name_key" ON "Action"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Action_code_key" ON "Action"("code");

-- CreateIndex
CREATE INDEX "Action_ID_createdAt_updatedAt_idx" ON "Action"("ID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Branch_ID_name_createdAt_updatedAt_idx" ON "Branch"("ID", "name", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_code_key" ON "Feature"("code");

-- CreateIndex
CREATE INDEX "Feature_ID_moduleID_createdAt_updatedAt_idx" ON "Feature"("ID", "moduleID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "Module"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Module_code_key" ON "Module"("code");

-- CreateIndex
CREATE INDEX "Module_ID_createdAt_updatedAt_idx" ON "Module"("ID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "OrganizationRole_ID_role_organizationID_userID_idx" ON "OrganizationRole"("ID", "role", "organizationID", "userID");

-- CreateIndex
CREATE INDEX "Organization_ID_name_type_createdAt_updatedAt_idx" ON "Organization"("ID", "name", "type", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Permission_ID_moduleID_featureID_actionID_createdAt_updated_idx" ON "Permission"("ID", "moduleID", "featureID", "actionID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_moduleID_featureID_actionID_key" ON "Permission"("moduleID", "featureID", "actionID");

-- CreateIndex
CREATE UNIQUE INDEX "PlanPrice_name_key" ON "PlanPrice"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlanPrice_code_key" ON "PlanPrice"("code");

-- CreateIndex
CREATE INDEX "PlanPrice_ID_name_code_createdAt_updatedAt_isActive_planID_idx" ON "PlanPrice"("ID", "name", "code", "createdAt", "updatedAt", "isActive", "planID");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_code_key" ON "Plan"("code");

-- CreateIndex
CREATE INDEX "Plan_ID_code_createdAt_updatedAt_idx" ON "Plan"("ID", "code", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userID_key" ON "Preference"("userID");

-- CreateIndex
CREATE INDEX "Preference_ID_userID_idx" ON "Preference"("ID", "userID");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userID_key" ON "Profile"("userID");

-- CreateIndex
CREATE INDEX "Profile_ID_gender_dateOfBirth_userID_idx" ON "Profile"("ID", "gender", "dateOfBirth", "userID");

-- CreateIndex
CREATE INDEX "UserPermission_ID_idx" ON "UserPermission"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermission_permissionID_userID_key" ON "UserPermission"("permissionID", "userID");

-- CreateIndex
CREATE INDEX "UserSubscription_ID_userID_planID_expiresAt_createdAt_updat_idx" ON "UserSubscription"("ID", "userID", "planID", "expiresAt", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_moduleID_key" ON "User"("moduleID");

-- CreateIndex
CREATE INDEX "User_ID_moduleID_email_idx" ON "User"("ID", "moduleID", "email");

-- CreateIndex
CREATE UNIQUE INDEX "User_moduleID_email_key" ON "User"("moduleID", "email");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationRole" ADD CONSTRAINT "OrganizationRole_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationRole" ADD CONSTRAINT "OrganizationRole_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_featureID_fkey" FOREIGN KEY ("featureID") REFERENCES "Feature"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_actionID_fkey" FOREIGN KEY ("actionID") REFERENCES "Action"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_permissionID_fkey" FOREIGN KEY ("permissionID") REFERENCES "Permission"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
