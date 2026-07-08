-- DropIndex
DROP INDEX "Country_ID_code_createdAt_updatedAt_idx";

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Country_ID_code_isActive_createdAt_updatedAt_idx" ON "Country"("ID", "code", "isActive", "createdAt", "updatedAt");
