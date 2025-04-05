/*
  Warnings:

  - You are about to drop the `estoques` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordens_estoque` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordens_estoque" DROP CONSTRAINT "ordens_estoque_estoqueId_fkey";

-- DropForeignKey
ALTER TABLE "ordens_estoque" DROP CONSTRAINT "ordens_estoque_ordemId_fkey";

-- DropTable
DROP TABLE "estoques";

-- DropTable
DROP TABLE "ordens_estoque";

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "ordens_items" ADD CONSTRAINT "ordens_items_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordens_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_items" ADD CONSTRAINT "ordens_items_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
