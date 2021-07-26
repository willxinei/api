/*
  Warnings:

  - You are about to drop the column `service_id` on the `Prestador` table. All the data in the column will be lost.
  - Added the required column `token_id` to the `Prestador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_id` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_prestador_id_fkey";

-- DropForeignKey
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_user_id_fkey";

-- AlterTable
ALTER TABLE "Prestador" DROP COLUMN "service_id",
ADD COLUMN     "token_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "token_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD FOREIGN KEY ("token_id") REFERENCES "Tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestador" ADD FOREIGN KEY ("token_id") REFERENCES "Tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;
