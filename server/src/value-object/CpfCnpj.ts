export async function formatCpfCnpj(cpfCnpj: string): Promise<string> {
  cpfCnpj = cpfCnpj.replace(/[^\d]+/g, "");

  return cpfCnpj;
}
