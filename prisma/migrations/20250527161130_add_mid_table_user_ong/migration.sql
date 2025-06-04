/*
  Warnings:

  - You are about to drop the column `id_user_fk` on the `Ong` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "OngType" ADD VALUE 'DIREITOS_HUMANOS';
ALTER TYPE "OngType" ADD VALUE 'MEIO_AMBIENTE';
ALTER TYPE "OngType" ADD VALUE 'CULTURA';

-- DropForeignKey
ALTER TABLE "Ong" DROP CONSTRAINT "Ong_id_user_fk_fkey";

-- DropIndex
DROP INDEX "Ong_id_user_fk_key";

-- AlterTable
ALTER TABLE "Ong" DROP COLUMN "id_user_fk";

-- CreateTable
CREATE TABLE "UserOng" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ongId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserOng_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOng_userId_ongId_key" ON "UserOng"("userId", "ongId");

-- AddForeignKey
ALTER TABLE "UserOng" ADD CONSTRAINT "UserOng_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOng" ADD CONSTRAINT "UserOng_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "Ong"("id_ong") ON DELETE RESTRICT ON UPDATE CASCADE;
