/*
  Warnings:

  - You are about to drop the `Branch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Branch";

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("ID")
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

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_code_key" ON "City"("code");

-- CreateIndex
CREATE INDEX "City_ID_name_code_stateID_createdAt_updatedAt_idx" ON "City"("ID", "name", "code", "stateID", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "Country_ID_code_createdAt_updatedAt_idx" ON "Country"("ID", "code", "createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- CreateIndex
CREATE UNIQUE INDEX "State_code_key" ON "State"("code");

-- CreateIndex
CREATE INDEX "State_ID_name_code_countryID_createdAt_updatedAt_idx" ON "State"("ID", "name", "code", "countryID", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateID_fkey" FOREIGN KEY ("stateID") REFERENCES "State"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Country"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
