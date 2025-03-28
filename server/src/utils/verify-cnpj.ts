import { CpfCnpjInvalidError } from "@/use-cases/erros/cpfCnpj-invalido";

export async function isValidCNPJ(cnpj: string): Promise<boolean> {
  // Verifica se tem 14 dígitos e se não é uma sequência repetida
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    throw new CpfCnpjInvalidError();
  }

  try {
    // Pesos para o cálculo dos dígitos verificadores
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]; // Para o primeiro dígito
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]; // Para o segundo dígito

    // Cálculo do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(cnpj.charAt(12))) throw new CpfCnpjInvalidError();

    // Cálculo do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(cnpj.charAt(13))) throw new CpfCnpjInvalidError();

    return true;
  } catch (error) {
    throw new CpfCnpjInvalidError();
  }
}
