/*
  Warnings:

  - You are about to drop the `mecanicos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordens_servico" DROP CONSTRAINT "ordens_servico_mecanicoId_fkey";

-- DropTable
DROP TABLE "mecanicos";
