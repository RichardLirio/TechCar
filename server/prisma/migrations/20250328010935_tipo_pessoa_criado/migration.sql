-- CreateEnum
CREATE TYPE "TipoCliente" AS ENUM ('JURIDICA', 'FISICA');

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "tipo" "TipoCliente" NOT NULL DEFAULT 'FISICA';
