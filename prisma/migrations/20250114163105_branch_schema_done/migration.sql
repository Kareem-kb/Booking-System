/*
  Warnings:

  - Made the column `address` on table `Branch` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Branch_contactEmail_idx";

-- DropIndex
DROP INDEX "Branch_name_idx";

-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "contactEmail" DROP NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- CreateTable
CREATE TABLE "BranchOperatingHours" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openTime" TEXT NOT NULL,
    "closeTime" TEXT NOT NULL,
    "isClosed" BOOLEAN NOT NULL,
    "branchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BranchOperatingHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchSpecialClosure" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "closeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BranchSpecialClosure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BranchOperatingHours_branchId_dayOfWeek_key" ON "BranchOperatingHours"("branchId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "BranchSpecialClosure_branchId_date_key" ON "BranchSpecialClosure"("branchId", "date");

-- AddForeignKey
ALTER TABLE "BranchOperatingHours" ADD CONSTRAINT "BranchOperatingHours_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchSpecialClosure" ADD CONSTRAINT "BranchSpecialClosure_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
