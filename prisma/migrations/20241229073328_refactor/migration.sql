-- CreateTable
CREATE TABLE "Locale" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Locale_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Locale_name_key" ON "Locale"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Locale_code_key" ON "Locale"("code");

-- CreateIndex
CREATE INDEX "Locale_ID_name_code_createdAt_updatedAt_idx" ON "Locale"("ID", "name", "code", "createdAt", "updatedAt");
