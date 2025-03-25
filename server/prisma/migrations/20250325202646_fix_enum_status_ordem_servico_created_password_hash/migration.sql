/*
  Warnings:

  - The `status` column on the `ordens_servico` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `password` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updateAt` to the `ordens_servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusOrdemServico" AS ENUM ('EM_ANDAMENTO', 'FECHADA');

-- DropIndex
DROP INDEX "usuarios_username_key";

-- AlterTable
ALTER TABLE "ordens_servico" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusOrdemServico" NOT NULL DEFAULT 'EM_ANDAMENTO';

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "name" VARCHAR(50) NOT NULL,
ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_name_key" ON "usuarios"("name");
