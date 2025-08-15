/*
  Warnings:

  - You are about to drop the column `created_at` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `methodofapply` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."jobs" DROP COLUMN "created_at",
DROP COLUMN "methodofapply",
DROP COLUMN "title",
DROP COLUMN "url",
ADD COLUMN     "applicationLink" TEXT,
ADD COLUMN     "notes" TEXT DEFAULT ' ',
ADD COLUMN     "position" TEXT,
ALTER COLUMN "applieddate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "location" SET DEFAULT 'undisclosed',
ALTER COLUMN "salary" SET DEFAULT '0';
