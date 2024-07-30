-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "state" TEXT NOT NULL DEFAULT 'Unknown';
