export async function formatarNomeProduto(nome: string) {
  const nomeFormatado = nome.trim().toUpperCase();

  return nomeFormatado; // Remove espaços em branco do início e do fim do nome
}
