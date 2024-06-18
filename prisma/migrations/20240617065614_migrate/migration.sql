-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "sequence" DROP DEFAULT;
DROP SEQUENCE "Event_sequence_seq";

-- CreateIndex
CREATE INDEX "Event_entityId_sequence_idx" ON "Event"("entityId", "sequence");
