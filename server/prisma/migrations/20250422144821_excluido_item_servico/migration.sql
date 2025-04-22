/*
  Warnings:

  - The values [EM_ANDAMENTO] on the enum `StatusOrdemServico` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `ordens_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordens_items_servicos` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusOrdemServico_new" AS ENUM ('ABERTA', 'FECHADA');
ALTER TABLE "ordens_servico" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ordens_servico" ALTER COLUMN "status" TYPE "StatusOrdemServico_new" USING ("status"::text::"StatusOrdemServico_new");
ALTER TYPE "StatusOrdemServico" RENAME TO "StatusOrdemServico_old";
ALTER TYPE "StatusOrdemServico_new" RENAME TO "StatusOrdemServico";
DROP TYPE "StatusOrdemServico_old";
ALTER TABLE "ordens_servico" ALTER COLUMN "status" SET DEFAULT 'ABERTA';
COMMIT;

-- DropForeignKey
ALTER TABLE "ordens_items" DROP CONSTRAINT "ordens_items_ordemId_fkey";

-- DropForeignKey
ALTER TABLE "ordens_items" DROP CONSTRAINT "ordens_items_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "ordens_items_servicos" DROP CONSTRAINT "ordens_items_servicos_ordemId_fkey";

-- DropForeignKey
ALTER TABLE "ordens_items_servicos" DROP CONSTRAINT "ordens_items_servicos_servicoId_fkey";

-- AlterTable
ALTER TABLE "ordens_servico" ALTER COLUMN "status" SET DEFAULT 'ABERTA';

-- DropTable
DROP TABLE "ordens_items";

-- DropTable
DROP TABLE "ordens_items_servicos";

-- CreateTable
CREATE TABLE "_OrdemServicoToProduto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrdemServicoToProduto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_OrdemServicoToServico" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrdemServicoToServico_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrdemServicoToProduto_B_index" ON "_OrdemServicoToProduto"("B");

-- CreateIndex
CREATE INDEX "_OrdemServicoToServico_B_index" ON "_OrdemServicoToServico"("B");

-- AddForeignKey
ALTER TABLE "_OrdemServicoToProduto" ADD CONSTRAINT "_OrdemServicoToProduto_A_fkey" FOREIGN KEY ("A") REFERENCES "ordens_servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdemServicoToProduto" ADD CONSTRAINT "_OrdemServicoToProduto_B_fkey" FOREIGN KEY ("B") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdemServicoToServico" ADD CONSTRAINT "_OrdemServicoToServico_A_fkey" FOREIGN KEY ("A") REFERENCES "ordens_servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdemServicoToServico" ADD CONSTRAINT "_OrdemServicoToServico_B_fkey" FOREIGN KEY ("B") REFERENCES "servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
