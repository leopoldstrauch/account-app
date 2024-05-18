-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "remark" TEXT;
