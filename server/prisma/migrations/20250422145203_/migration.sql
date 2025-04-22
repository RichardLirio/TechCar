/*
  Warnings:

  - The values [ABERTA] on the enum `StatusOrdemServico` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_OrdemServicoToProduto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrdemServicoToServico` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusOrdemServico_new" AS ENUM ('EM_ANDAMENTO', 'FECHADA');
ALTER TABLE "ordens_servico" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ordens_servico" ALTER COLUMN "status" TYPE "StatusOrdemServico_new" USING ("status"::text::"StatusOrdemServico_new");
ALTER TYPE "StatusOrdemServico" RENAME TO "StatusOrdemServico_old";
ALTER TYPE "StatusOrdemServico_new" RENAME TO "StatusOrdemServico";
DROP TYPE "StatusOrdemServico_old";
ALTER TABLE "ordens_servico" ALTER COLUMN "status" SET DEFAULT 'EM_ANDAMENTO';
COMMIT;

-- DropForeignKey
ALTER TABLE "_OrdemServicoToProduto" DROP CONSTRAINT "_OrdemServicoToProduto_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrdemServicoToProduto" DROP CONSTRAINT "_OrdemServicoToProduto_B_fkey";

-- DropForeignKey
ALTER TABLE "_OrdemServicoToServico" DROP CONSTRAINT "_OrdemServicoToServico_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrdemServicoToServico" DROP CONSTRAINT "_OrdemServicoToServico_B_fkey";

-- AlterTable
ALTER TABLE "ordens_servico" ALTER COLUMN "status" SET DEFAULT 'EM_ANDAMENTO';

-- DropTable
DROP TABLE "_OrdemServicoToProduto";

-- DropTable
DROP TABLE "_OrdemServicoToServico";

-- CreateTable
CREATE TABLE "ordens_items_servicos" (
    "id" SERIAL NOT NULL,
    "ordemId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ordens_items_servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordens_items" (
    "id" SERIAL NOT NULL,
    "ordemId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidadeUsada" INTEGER NOT NULL,
    "valorUnitarioPeca" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ordens_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ordens_items_servicos" ADD CONSTRAINT "ordens_items_servicos_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordens_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_items_servicos" ADD CONSTRAINT "ordens_items_servicos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_items" ADD CONSTRAINT "ordens_items_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordens_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_items" ADD CONSTRAINT "ordens_items_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
