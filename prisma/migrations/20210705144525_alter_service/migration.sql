/*
  Warnings:

  - You are about to drop the column `service_id` on the `Services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_service_id_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "service_id",
ALTER COLUMN "provider_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Services" ADD FOREIGN KEY ("provider_id") REFERENCES "Prestador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
