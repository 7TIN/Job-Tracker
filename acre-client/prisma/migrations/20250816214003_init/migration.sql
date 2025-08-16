-- CreateEnum
CREATE TYPE "public"."AdminRole" AS ENUM ('SUPER_ADMIN', 'MODERATOR');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "email" TEXT,
    "display_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."jobs" (
    "id" UUID NOT NULL,
    "userid" UUID NOT NULL,
    "company" TEXT,
    "position" TEXT,
    "applicationlink" TEXT,
    "status" TEXT DEFAULT 'Applied',
    "applieddate" DATE DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT DEFAULT 'undisclosed',
    "platform" TEXT,
    "salary" TEXT DEFAULT '0',
    "notes" TEXT DEFAULT ' ',

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."AdminRole" NOT NULL DEFAULT 'MODERATOR',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- AddForeignKey
ALTER TABLE "public"."jobs" ADD CONSTRAINT "jobs_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
