/*
  Warnings:

  - A unique constraint covering the columns `[id_user_fk]` on the table `Ong` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Ong" DROP CONSTRAINT "Ong_id_ong_fkey";

-- AlterTable
ALTER TABLE "Ong" ADD COLUMN     "id_user_fk" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ong_id_user_fk_key" ON "Ong"("id_user_fk");

-- AddForeignKey
ALTER TABLE "Ong" ADD CONSTRAINT "Ong_id_user_fk_fkey" FOREIGN KEY ("id_user_fk") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
