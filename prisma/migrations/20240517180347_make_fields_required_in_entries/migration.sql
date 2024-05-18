/*
  Warnings:

  - Made the column `date` on table `Entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `documentNumber` on table `Entry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remark` on table `Entry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "documentNumber" SET NOT NULL,
ALTER COLUMN "remark" SET NOT NULL;
