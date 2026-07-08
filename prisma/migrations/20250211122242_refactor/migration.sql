-- DropIndex
DROP INDEX "Locale_ID_name_code_createdAt_updatedAt_idx";

-- AlterTable
ALTER TABLE "Locale" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Locale_ID_name_code_createdAt_updatedAt_isActive_idx" ON "Locale"("ID", "name", "code", "createdAt", "updatedAt", "isActive");
