-- AlterTable
ALTER TABLE "Prestador" ALTER COLUMN "token_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "token_id" DROP NOT NULL;
