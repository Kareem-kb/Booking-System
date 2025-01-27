/*
  Warnings:

  - You are about to drop the column `address` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Branch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "address",
DROP COLUMN "name";

-- CreateTable
CREATE TABLE "BranchTranslation" (
    "id" TEXT NOT NULL,
    "branchid" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BranchTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BranchTranslation_branchid_language_key" ON "BranchTranslation"("branchid", "language");

-- AddForeignKey
ALTER TABLE "BranchTranslation" ADD CONSTRAINT "BranchTranslation_branchid_fkey" FOREIGN KEY ("branchid") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
