/*
  Warnings:

  - A unique constraint covering the columns `[accessToken]` on the table `Ong` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ong" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "expiresIn" INTEGER,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "publicKey" TEXT,
ADD COLUMN     "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ong_accessToken_key" ON "Ong"("accessToken");
