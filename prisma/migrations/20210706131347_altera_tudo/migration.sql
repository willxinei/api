-- AlterTable
ALTER TABLE "Prestador" ALTER COLUMN "telefone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Reservas" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "telefone" SET DATA TYPE TEXT;
