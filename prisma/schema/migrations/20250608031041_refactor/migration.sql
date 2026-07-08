-- CreateTable
CREATE TABLE "Account" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "excludeFromOverview" BOOLEAN DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrganizationAccount" (
    "ID" TEXT NOT NULL,
    "accountID" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdByUserID" TEXT,
    "updatedByUserID" TEXT,

    CONSTRAINT "OrganizationAccount_pkey" PRIMARY KEY ("ID")
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
CREATE TABLE "Address" (
    "ID" TEXT NOT NULL,
    "lineAddressOne" TEXT NOT NULL,
    "lineAddressTwo" TEXT,
    "postcode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "City" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stateID" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Country" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Currency" (
    "ID" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Feature" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleID" TEXT NOT NULL,
    "industryID" TEXT,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "FeatureAction" (
    "ID" TEXT NOT NULL,
    "name" TEXT,
    "featureID" TEXT NOT NULL,
    "actionID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureAction_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "FeatureActionPlanLimit" (
    "ID" TEXT NOT NULL,
    "featureActionID" TEXT NOT NULL,
    "planID" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'RECORDS',
    "limit" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeatureActionPlanLimit_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "IndustryRole" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "industryID" TEXT NOT NULL,
    "roleID" TEXT NOT NULL,

    CONSTRAINT "IndustryRole_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Industry" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Locale" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Locale_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Module" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrganizationPlan" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "ownerID" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,
    "planID" TEXT NOT NULL,

    CONSTRAINT "OrganizationPlan_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Organization" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "industryID" TEXT NOT NULL,
    "createdByUserID" TEXT NOT NULL,
    "updatedByUserID" TEXT,

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
    "roleID" TEXT NOT NULL,
    "actionID" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Picture" (
    "ID" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PlanFeature" (
    "ID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "limit" INTEGER NOT NULL,
    "planID" TEXT NOT NULL,
    "featureID" TEXT NOT NULL,

    CONSTRAINT "PlanFeature_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Plan" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleID" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "PlanPrice" (
    "ID" TEXT NOT NULL,
    "stripeID" TEXT NOT NULL,
    "amountInCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "interval" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "planID" TEXT NOT NULL,

    CONSTRAINT "PlanPrice_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Role" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "moduleID" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "State" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "countryID" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "ID" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transactionCategoryID" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "TransactionCategory" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionCategory_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "TransactionAttachment" (
    "ID" TEXT NOT NULL,
    "transactionID" TEXT NOT NULL,
    "uploadID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransactionAttachment_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "OrganizationTransaction" (
    "ID" TEXT NOT NULL,
    "transactionID" TEXT NOT NULL,
    "organizationID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserID" TEXT,
    "updatedByUserID" TEXT,

    CONSTRAINT "OrganizationTransaction_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Upload" (
    "ID" TEXT NOT NULL,
    "originalFileName" TEXT,
    "fileSizeInBytes" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "consumedAt" TIMESTAMP(3),
    "compressedAt" TIMESTAMP(3),
    "createdByUserID" TEXT NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserDevice" (
    "ID" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "UserDevice_pkey" PRIMARY KEY ("ID")
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
CREATE TABLE "UserPlan" (
    "ID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "planID" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "ID" TEXT NOT NULL,
    "appearance" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "setAt" TIMESTAMP(3),
    "userID" TEXT NOT NULL,
    "localeID" TEXT NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserProfile" (
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

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "ID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "roleID" TEXT NOT NULL,
    "moduleID" TEXT NOT NULL,
    "organizationID" TEXT,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("ID")
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
    "externalID" TEXT,
    "provider" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "claimedAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "stripeCustomerID" TEXT,
    "moduleID" TEXT NOT NULL,
    "isActive" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "Account_ID_balance_createdAt_updatedAt_idx" ON "Account"("ID", "balance", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "OrganizationAccount_ID_accountID_organizationID_createdAt_u_idx" ON "OrganizationAccount"("ID", "accountID", "organizationID", "createdAt", "updatedAt", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationAccount_accountID_organizationID_key" ON "OrganizationAccount"("accountID", "organizationID");

-- CreateIndex
CREATE UNIQUE INDEX "Action_code_key" ON "Action"("code");

-- CreateIndex
CREATE INDEX "Action_ID_name_code_createdAt_updatedAt_idx" ON "Action"("ID", "name", "code", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_code_key" ON "City"("code");

-- CreateIndex
CREATE INDEX "City_ID_name_code_stateID_createdAt_updatedAt_idx" ON "City"("ID", "name", "code", "stateID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "Country_ID_code_isActive_createdAt_updatedAt_idx" ON "Country"("ID", "code", "isActive", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE INDEX "Currency_ID_code_idx" ON "Currency"("ID", "code");

-- CreateIndex
CREATE INDEX "Feature_ID_moduleID_createdAt_updatedAt_idx" ON "Feature"("ID", "moduleID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_code_moduleID_key" ON "Feature"("code", "moduleID");

-- CreateIndex
CREATE INDEX "FeatureAction_ID_featureID_actionID_idx" ON "FeatureAction"("ID", "featureID", "actionID");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureAction_featureID_actionID_key" ON "FeatureAction"("featureID", "actionID");

-- CreateIndex
CREATE INDEX "FeatureActionPlanLimit_ID_featureActionID_planID_idx" ON "FeatureActionPlanLimit"("ID", "featureActionID", "planID");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureActionPlanLimit_featureActionID_planID_key" ON "FeatureActionPlanLimit"("featureActionID", "planID");

-- CreateIndex
CREATE INDEX "IndustryRole_ID_roleID_industryID_idx" ON "IndustryRole"("ID", "roleID", "industryID");

-- CreateIndex
CREATE UNIQUE INDEX "IndustryRole_roleID_industryID_key" ON "IndustryRole"("roleID", "industryID");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_name_key" ON "Industry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_code_key" ON "Industry"("code");

-- CreateIndex
CREATE INDEX "Industry_ID_name_code_createdAt_updatedAt_idx" ON "Industry"("ID", "name", "code", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Locale_name_key" ON "Locale"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Locale_code_key" ON "Locale"("code");

-- CreateIndex
CREATE INDEX "Locale_ID_name_code_createdAt_updatedAt_isActive_idx" ON "Locale"("ID", "name", "code", "createdAt", "updatedAt", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Module_code_key" ON "Module"("code");

-- CreateIndex
CREATE INDEX "Module_ID_name_code_createdAt_updatedAt_idx" ON "Module"("ID", "name", "code", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationPlan_organizationID_key" ON "OrganizationPlan"("organizationID");

-- CreateIndex
CREATE INDEX "OrganizationPlan_ID_organizationID_planID_expiresAt_ownerID_idx" ON "OrganizationPlan"("ID", "organizationID", "planID", "expiresAt", "ownerID");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationPlan_organizationID_planID_key" ON "OrganizationPlan"("organizationID", "planID");

-- CreateIndex
CREATE INDEX "Organization_ID_name_industryID_createdAt_updatedAt_idx" ON "Organization"("ID", "name", "industryID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Permission_ID_moduleID_featureID_actionID_createdAt_updated_idx" ON "Permission"("ID", "moduleID", "featureID", "actionID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_moduleID_featureID_actionID_roleID_key" ON "Permission"("moduleID", "featureID", "actionID", "roleID");

-- CreateIndex
CREATE INDEX "PlanFeature_ID_planID_featureID_idx" ON "PlanFeature"("ID", "planID", "featureID");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_code_key" ON "Plan"("code");

-- CreateIndex
CREATE INDEX "Plan_ID_code_createdAt_updatedAt_idx" ON "Plan"("ID", "code", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PlanPrice_stripeID_key" ON "PlanPrice"("stripeID");

-- CreateIndex
CREATE INDEX "PlanPrice_ID_stripeID_planID_currency_interval_createdAt_up_idx" ON "PlanPrice"("ID", "stripeID", "planID", "currency", "interval", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Role_ID_code_moduleID_createdAt_updatedAt_idx" ON "Role"("ID", "code", "moduleID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_moduleID_key" ON "Role"("code", "moduleID");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_code_key" ON "State"("code");

-- CreateIndex
CREATE INDEX "State_ID_name_code_countryID_createdAt_updatedAt_idx" ON "State"("ID", "name", "code", "countryID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Transaction_ID_amount_accountID_createdAt_updatedAt_idx" ON "Transaction"("ID", "amount", "accountID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "TransactionCategory_ID_name_createdAt_updatedAt_idx" ON "TransactionCategory"("ID", "name", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "TransactionAttachment_ID_transactionID_uploadID_idx" ON "TransactionAttachment"("ID", "transactionID", "uploadID");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationTransaction_transactionID_key" ON "OrganizationTransaction"("transactionID");

-- CreateIndex
CREATE INDEX "OrganizationTransaction_ID_transactionID_organizationID_cre_idx" ON "OrganizationTransaction"("ID", "transactionID", "organizationID", "createdAt", "updatedAt", "createdByUserID", "updatedByUserID");

-- CreateIndex
CREATE UNIQUE INDEX "Upload_key_key" ON "Upload"("key");

-- CreateIndex
CREATE INDEX "Upload_ID_mimetype_key_consumedAt_createdByUserID_idx" ON "Upload"("ID", "mimetype", "key", "consumedAt", "createdByUserID");

-- CreateIndex
CREATE UNIQUE INDEX "UserDevice_token_key" ON "UserDevice"("token");

-- CreateIndex
CREATE INDEX "UserDevice_ID_token_userID_createdAt_updatedAt_idx" ON "UserDevice"("ID", "token", "userID", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "UserPermission_ID_idx" ON "UserPermission"("ID");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermission_permissionID_userID_key" ON "UserPermission"("permissionID", "userID");

-- CreateIndex
CREATE UNIQUE INDEX "UserPlan_userID_key" ON "UserPlan"("userID");

-- CreateIndex
CREATE INDEX "UserPlan_ID_userID_planID_createdAt_updatedAt_idx" ON "UserPlan"("ID", "userID", "planID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userID_key" ON "UserPreference"("userID");

-- CreateIndex
CREATE INDEX "UserPreference_ID_userID_localeID_createdAt_updatedAt_idx" ON "UserPreference"("ID", "userID", "localeID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userID_key" ON "UserProfile"("userID");

-- CreateIndex
CREATE INDEX "UserProfile_ID_gender_dateOfBirth_userID_idx" ON "UserProfile"("ID", "gender", "dateOfBirth", "userID");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userID_roleID_moduleID_organizationID_key" ON "UserRole"("userID", "roleID", "moduleID", "organizationID");

-- CreateIndex
CREATE INDEX "UserSubscription_ID_userID_planID_expiresAt_createdAt_updat_idx" ON "UserSubscription"("ID", "userID", "planID", "expiresAt", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerID_key" ON "User"("stripeCustomerID");

-- CreateIndex
CREATE INDEX "User_ID_externalID_provider_moduleID_email_isActive_idx" ON "User"("ID", "externalID", "provider", "moduleID", "email", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "User_moduleID_email_key" ON "User"("moduleID", "email");

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAccount" ADD CONSTRAINT "OrganizationAccount_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateID_fkey" FOREIGN KEY ("stateID") REFERENCES "State"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_industryID_fkey" FOREIGN KEY ("industryID") REFERENCES "Industry"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureAction" ADD CONSTRAINT "FeatureAction_actionID_fkey" FOREIGN KEY ("actionID") REFERENCES "Action"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureAction" ADD CONSTRAINT "FeatureAction_featureID_fkey" FOREIGN KEY ("featureID") REFERENCES "Feature"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureActionPlanLimit" ADD CONSTRAINT "FeatureActionPlanLimit_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeatureActionPlanLimit" ADD CONSTRAINT "FeatureActionPlanLimit_featureActionID_fkey" FOREIGN KEY ("featureActionID") REFERENCES "FeatureAction"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryRole" ADD CONSTRAINT "IndustryRole_industryID_fkey" FOREIGN KEY ("industryID") REFERENCES "Industry"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryRole" ADD CONSTRAINT "IndustryRole_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationPlan" ADD CONSTRAINT "OrganizationPlan_ownerID_fkey" FOREIGN KEY ("ownerID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationPlan" ADD CONSTRAINT "OrganizationPlan_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationPlan" ADD CONSTRAINT "OrganizationPlan_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_industryID_fkey" FOREIGN KEY ("industryID") REFERENCES "Industry"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_featureID_fkey" FOREIGN KEY ("featureID") REFERENCES "Feature"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_actionID_fkey" FOREIGN KEY ("actionID") REFERENCES "Action"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanFeature" ADD CONSTRAINT "PlanFeature_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanFeature" ADD CONSTRAINT "PlanFeature_featureID_fkey" FOREIGN KEY ("featureID") REFERENCES "Feature"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanPrice" ADD CONSTRAINT "PlanPrice_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "Account"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionCategoryID_fkey" FOREIGN KEY ("transactionCategoryID") REFERENCES "TransactionCategory"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionAttachment" ADD CONSTRAINT "TransactionAttachment_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionAttachment" ADD CONSTRAINT "TransactionAttachment_uploadID_fkey" FOREIGN KEY ("uploadID") REFERENCES "Upload"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_transactionID_fkey" FOREIGN KEY ("transactionID") REFERENCES "Transaction"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationTransaction" ADD CONSTRAINT "OrganizationTransaction_updatedByUserID_fkey" FOREIGN KEY ("updatedByUserID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDevice" ADD CONSTRAINT "UserDevice_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_permissionID_fkey" FOREIGN KEY ("permissionID") REFERENCES "Permission"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_localeID_fkey" FOREIGN KEY ("localeID") REFERENCES "Locale"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Role"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_organizationID_fkey" FOREIGN KEY ("organizationID") REFERENCES "Organization"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "Module"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
