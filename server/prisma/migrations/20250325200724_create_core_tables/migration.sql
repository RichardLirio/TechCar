-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "veiculos" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "placa" VARCHAR(10) NOT NULL,
    "modelo" VARCHAR(50) NOT NULL,
    "marca" VARCHAR(50) NOT NULL,
    "ano" INTEGER,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordensServico" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'Em andamento',
    "mecanicoId" INTEGER,
    "desconto" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "valorTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ordensServico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" SERIAL NOT NULL,
    "ordemId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "valorServico" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoques" (
    "id" SERIAL NOT NULL,
    "nomePeca" VARCHAR(100) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorUnitario" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "estoques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordensEstoque" (
    "id" SERIAL NOT NULL,
    "ordemId" INTEGER NOT NULL,
    "estoqueId" INTEGER NOT NULL,
    "quantidadeUsada" INTEGER NOT NULL,
    "valorUnitarioPeca" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ordensEstoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "telefone" VARCHAR(15),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mecanicos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "especialidade" VARCHAR(50),

    CONSTRAINT "mecanicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- AddForeignKey
ALTER TABLE "veiculos" ADD CONSTRAINT "veiculos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordensServico" ADD CONSTRAINT "ordensServico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordensServico" ADD CONSTRAINT "ordensServico_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordensServico" ADD CONSTRAINT "ordensServico_mecanicoId_fkey" FOREIGN KEY ("mecanicoId") REFERENCES "mecanicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servicos" ADD CONSTRAINT "servicos_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordensServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordensEstoque" ADD CONSTRAINT "ordensEstoque_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordensServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordensEstoque" ADD CONSTRAINT "ordensEstoque_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "estoques"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
