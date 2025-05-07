/*
  Warnings:

  - The values [ONG,CLIENT] on the enum `Perfil` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cnpj` on the `User` table. All the data in the column will be lost.
  - Made the column `cpf` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "OngType" AS ENUM ('ALIMENTOS', 'UTENSILIOS_ADERECOS', 'ANIMAIS', 'SAUDE', 'MORADIA', 'TRANSPORTE', 'EDUCACAO', 'OUTROS');

-- AlterEnum
BEGIN;
CREATE TYPE "Perfil_new" AS ENUM ('ADMIN', 'DONATOR', 'ADMIN_ONG');
ALTER TABLE "User" ALTER COLUMN "type" TYPE "Perfil_new" USING ("type"::text::"Perfil_new");
ALTER TYPE "Perfil" RENAME TO "Perfil_old";
ALTER TYPE "Perfil_new" RENAME TO "Perfil";
DROP TYPE "Perfil_old";
COMMIT;

-- DropIndex
DROP INDEX "User_cnpj_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cnpj",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "cpf" SET NOT NULL;

-- CreateTable
CREATE TABLE "Ong" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT,
    "context" "OngType" NOT NULL,
    "address" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Ong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ongId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ong_cnpj_key" ON "Ong"("cnpj");

-- AddForeignKey
ALTER TABLE "Ong" ADD CONSTRAINT "Ong_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "Ong"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
