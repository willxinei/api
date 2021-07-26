/*
  Warnings:

  - You are about to drop the column `token_id` on the `Prestador` table. All the data in the column will be lost.
  - You are about to drop the column `token_id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prestador" DROP CONSTRAINT "Prestador_token_id_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_token_id_fkey";

-- AlterTable
ALTER TABLE "Prestador" DROP COLUMN "token_id",
ADD COLUMN     "token" TEXT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "token_id",
ADD COLUMN     "token" TEXT;

-- DropTable
DROP TABLE "Tokens";
