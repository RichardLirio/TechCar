/*
  Warnings:

  - You are about to drop the column `updateAt` on the `ordens_servico` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ordens_servico" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
