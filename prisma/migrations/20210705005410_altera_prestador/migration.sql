/*
  Warnings:

  - Added the required column `senha` to the `Prestador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prestador" ADD COLUMN     "senha" TEXT NOT NULL;
