/*
  Warnings:

  - The values [EM_ANDAMENTO] on the enum `StatusOrdemServico` will be removed. If these variants are still used in the database, this will fail.

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

-- AlterTable
ALTER TABLE "ordens_servico" ALTER COLUMN "status" SET DEFAULT 'ABERTA';
