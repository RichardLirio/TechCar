-- DropForeignKey
ALTER TABLE "servicos" DROP CONSTRAINT "servicos_ordemId_fkey";

-- CreateTable
CREATE TABLE "ordens_items_servicos" (
    "id" SERIAL NOT NULL,
    "ordemId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ordens_items_servicos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ordens_items_servicos" ADD CONSTRAINT "ordens_items_servicos_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordens_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_items_servicos" ADD CONSTRAINT "ordens_items_servicos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
