-- CreateEnum
CREATE TYPE "hashUpdateToken" AS ENUM ('String', 'Null');

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "hashUpdateToken" DROP NOT NULL;
