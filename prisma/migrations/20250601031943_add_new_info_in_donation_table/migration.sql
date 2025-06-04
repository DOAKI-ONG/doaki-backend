-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "dataApproved" TEXT,
ADD COLUMN     "dataCreated" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentMpId" INTEGER,
ADD COLUMN     "status" TEXT,
ALTER COLUMN "amount" DROP NOT NULL;
