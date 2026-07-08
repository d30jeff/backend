-- CreateTable
CREATE TABLE "Upload" (
    "ID" TEXT NOT NULL,
    "originalFileName" TEXT,
    "fileSizeInBytes" INTEGER NOT NULL,
    "mimetype" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "compressedAt" TIMESTAMP(3),
    "createdByUserID" TEXT NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Upload_key_key" ON "Upload"("key");

-- CreateIndex
CREATE INDEX "Upload_ID_mimetype_key_consumedAt_createdByUserID_idx" ON "Upload"("ID", "mimetype", "key", "consumedAt", "createdByUserID");

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_createdByUserID_fkey" FOREIGN KEY ("createdByUserID") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
