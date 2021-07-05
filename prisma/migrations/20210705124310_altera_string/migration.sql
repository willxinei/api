/*
  Warnings:

  - Changed the type of `provider_id` on the `Services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dia` on the `bloqueio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `mes` on the `bloqueio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `provider_id` on the `provider_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Services" DROP COLUMN "provider_id",
ADD COLUMN     "provider_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "bloqueio" DROP COLUMN "dia",
ADD COLUMN     "dia" INTEGER NOT NULL,
DROP COLUMN "mes",
ADD COLUMN     "mes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "provider_tokens" DROP COLUMN "provider_id",
ADD COLUMN     "provider_id" UUID NOT NULL;
