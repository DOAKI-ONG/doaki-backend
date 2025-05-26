/*
  Warnings:

  - You are about to drop the column `active` on the `Ong` table. All the data in the column will be lost.
  - Made the column `cnpj` on table `Ong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Ong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `accessToken` on table `Ong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Ong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expiresIn` on table `Ong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileImage` on table `Ong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publicKey` on table `Ong` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshToken` on table `Ong` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ong" DROP COLUMN "active",
ALTER COLUMN "cnpj" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "accessToken" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "expiresIn" SET NOT NULL,
ALTER COLUMN "profileImage" SET NOT NULL,
ALTER COLUMN "profileImage" SET DEFAULT 'https://th.bing.com/th/id/OIP.0uaGrLEY_HxDEyklFhqGXgAAAA?rs=1&pid=ImgDetMain',
ALTER COLUMN "publicKey" SET NOT NULL,
ALTER COLUMN "refreshToken" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImage" SET DEFAULT 'https://th.bing.com/th/id/OIP.0uaGrLEY_HxDEyklFhqGXgAAAA?rs=1&pid=ImgDetMain';
