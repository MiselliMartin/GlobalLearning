/*
  Warnings:

  - You are about to drop the column `password_hash` on the `User` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('OBJECT', 'PERSON', 'PET');

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "type",
ADD COLUMN     "type" "ReportType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password_hash",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Type";
