/*
  Warnings:

  - The primary key for the `Ong` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ong` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `id_ong` was added to the `Ong` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id_user` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_ongId_fkey";

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ong" DROP CONSTRAINT "Ong_id_fkey";

-- AlterTable
ALTER TABLE "Ong" DROP CONSTRAINT "Ong_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_ong" TEXT NOT NULL,
ADD CONSTRAINT "Ong_pkey" PRIMARY KEY ("id_ong");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_user" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_user");

-- AddForeignKey
ALTER TABLE "Ong" ADD CONSTRAINT "Ong_id_ong_fkey" FOREIGN KEY ("id_ong") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "Ong"("id_ong") ON DELETE RESTRICT ON UPDATE CASCADE;
