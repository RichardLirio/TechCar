/*
  Warnings:

  - You are about to drop the column `ordemId` on the `servicos` table. All the data in the column will be lost.
  - Added the required column `km` to the `ordens_servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ordens_servico" ADD COLUMN     "km" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "servicos" DROP COLUMN "ordemId";
