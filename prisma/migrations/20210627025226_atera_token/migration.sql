/*
  Warnings:

  - You are about to drop the column `provider_id` on the `user_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "provider_id",
ALTER COLUMN "token" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;
