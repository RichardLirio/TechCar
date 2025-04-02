/*
  Warnings:

  - A unique constraint covering the columns `[placa]` on the table `veiculos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "veiculos_placa_key" ON "veiculos"("placa");
