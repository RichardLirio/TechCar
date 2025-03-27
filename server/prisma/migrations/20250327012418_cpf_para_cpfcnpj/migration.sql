/*
  Warnings:

  - You are about to drop the column `cpf` on the `clientes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpfCnpj]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpfCnpj` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clientes_cpf_key";

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "cpf",
ADD COLUMN     "cpfCnpj" VARCHAR(14) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpfCnpj_key" ON "clientes"("cpfCnpj");
