/*
  Warnings:

  - You are about to drop the column `agendamento_id` on the `Prestador` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prestador" DROP COLUMN "agendamento_id";

-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "value" SET DATA TYPE TEXT;
