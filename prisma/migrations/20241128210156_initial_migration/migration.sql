-- CreateTable
CREATE TABLE "Consumer" (
    "ID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ConsumerProvider" (
    "ID" TEXT NOT NULL,
    "consumerID" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsumerProvider_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Profile" (
    "ID" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "consumerID" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Business" (
    "ID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "BusinessProvider" (
    "ID" TEXT NOT NULL,
    "businessID" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessProvider_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Organization" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Branches" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branches_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consumer_email_key" ON "Consumer"("email");

-- CreateIndex
CREATE INDEX "Consumer_ID_email_idx" ON "Consumer"("ID", "email");

-- CreateIndex
CREATE INDEX "ConsumerProvider_ID_consumerID_provider_idx" ON "ConsumerProvider"("ID", "consumerID", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "ConsumerProvider_consumerID_provider_key" ON "ConsumerProvider"("consumerID", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_consumerID_key" ON "Profile"("consumerID");

-- CreateIndex
CREATE INDEX "Profile_ID_gender_dateOfBirth_consumerID_idx" ON "Profile"("ID", "gender", "dateOfBirth", "consumerID");

-- CreateIndex
CREATE INDEX "Business_ID_email_idx" ON "Business"("ID", "email");

-- CreateIndex
CREATE INDEX "BusinessProvider_ID_businessID_provider_idx" ON "BusinessProvider"("ID", "businessID", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProvider_businessID_provider_key" ON "BusinessProvider"("businessID", "provider");

-- CreateIndex
CREATE INDEX "Organization_ID_name_createdAt_updatedAt_idx" ON "Organization"("ID", "name", "createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "Branches_ID_name_createdAt_updatedAt_idx" ON "Branches"("ID", "name", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "ConsumerProvider" ADD CONSTRAINT "ConsumerProvider_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_consumerID_fkey" FOREIGN KEY ("consumerID") REFERENCES "Consumer"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProvider" ADD CONSTRAINT "BusinessProvider_businessID_fkey" FOREIGN KEY ("businessID") REFERENCES "Business"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
