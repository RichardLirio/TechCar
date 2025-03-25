/*
  Warnings:

  - You are about to drop the `ordensEstoque` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ordensServico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordensEstoque" DROP CONSTRAINT "ordensEstoque_estoqueId_fkey";

-- DropForeignKey
ALTER TABLE "ordensEstoque" DROP CONSTRAINT "ordensEstoque_ordemId_fkey";

-- DropForeignKey
ALTER TABLE "ordensServico" DROP CONSTRAINT "ordensServico_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "ordensServico" DROP CONSTRAINT "ordensServico_mecanicoId_fkey";

-- DropForeignKey
ALTER TABLE "ordensServico" DROP CONSTRAINT "ordensServico_veiculoId_fkey";

-- DropForeignKey
ALTER TABLE "servicos" DROP CONSTRAINT "servicos_ordemId_fkey";

-- DropTable
DROP TABLE "ordensEstoque";

-- DropTable
DROP TABLE "ordensServico";

-- CreateTable
CREATE TABLE "ordens_servico" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Em andamento',
    "mecanicoId" INTEGER,
    "desconto" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "valorTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ordens_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordens_estoque" (
    "id" SERIAL NOT NULL,
    "ordemId" INTEGER NOT NULL,
    "estoqueId" INTEGER NOT NULL,
    "quantidadeUsada" INTEGER NOT NULL,
    "valorUnitarioPeca" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ordens_estoque_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ordens_servico" ADD CONSTRAINT "ordens_servico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_servico" ADD CONSTRAINT "ordens_servico_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_servico" ADD CONSTRAINT "ordens_servico_mecanicoId_fkey" FOREIGN KEY ("mecanicoId") REFERENCES "mecanicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordens_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_estoque" ADD CONSTRAINT "ordens_estoque_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordens_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_estoque" ADD CONSTRAINT "ordens_estoque_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "estoques"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
