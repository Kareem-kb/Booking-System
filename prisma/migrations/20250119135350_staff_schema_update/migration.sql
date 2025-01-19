/*
  Warnings:

  - You are about to drop the column `aboutMe` on the `Staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Staff" DROP COLUMN "aboutMe";

-- CreateTable
CREATE TABLE "StaffTranslation" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "aboutMe" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffTranslation_staffId_language_key" ON "StaffTranslation"("staffId", "language");

-- AddForeignKey
ALTER TABLE "StaffTranslation" ADD CONSTRAINT "StaffTranslation_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
