-- CreateTable
CREATE TABLE "UserDevice" (
    "ID" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "UserDevice_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDevice_token_key" ON "UserDevice"("token");

-- CreateIndex
CREATE INDEX "UserDevice_ID_token_userID_createdAt_updatedAt_idx" ON "UserDevice"("ID", "token", "userID", "createdAt", "updatedAt");

-- AddForeignKey
ALTER TABLE "UserDevice" ADD CONSTRAINT "UserDevice_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
