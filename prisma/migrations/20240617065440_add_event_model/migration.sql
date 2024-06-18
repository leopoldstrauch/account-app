-- Prisma Migration File

-- Change existing table
ALTER TABLE "Event" ADD COLUMN "entityId" TEXT NOT NULL DEFAULT 'temporary_id';
ALTER TABLE "Event" ADD COLUMN "sequence" SERIAL NOT NULL;

-- Once columns are added with default values, we can remove the default value
ALTER TABLE "Event" ALTER COLUMN "entityId" DROP DEFAULT;
