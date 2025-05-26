/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Ong` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Ong` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ong` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ong" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ong_email_key" ON "Ong"("email");
