/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."jobs" DROP CONSTRAINT "jobs_userid_fkey";

-- DropTable
DROP TABLE "public"."users";
