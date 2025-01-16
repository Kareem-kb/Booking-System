/*
  Warnings:

  - You are about to drop the `ServiceImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServiceImage" DROP CONSTRAINT "ServiceImage_serviceId_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "ServiceImage";
