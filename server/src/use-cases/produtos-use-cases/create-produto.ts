import { Produto } from "@prisma/client";
import { ProdutoAlreadyExistsError } from "../erros/produto-ja-existe-erro";
import { ProdutoRepository } from "@/repositories/produto-repository";
import { formatarDescricao } from "@/value-object/FormatarDescricao";

interface CreateProdutoUseCaseParams {
  nome: string;
  quantidade: number;
  valorUnitario: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface CreateProdutoUseCaseResponse {
  produto: Produto;
} // Cria uma interface para a resposta do caso de uso

export class CreateProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    nome,
    quantidade,
    valorUnitario,
  }: CreateProdutoUseCaseParams): Promise<CreateProdutoUseCaseResponse> {
    const nomeFormatado = await formatarDescricao(nome); // Formata o nome do produto

    const produtoComMesmoNome = await this.produtoRepository.findByNome(
      nomeFormatado
    ); // Verifica se já existe um Produto com o mesmo nome

    if (produtoComMesmoNome) {
      throw new ProdutoAlreadyExistsError();
    } // Lança um erro se o produto já existir

    const produto = await this.produtoRepository.create({
      nome: nomeFormatado,
      quantidade,
      valorUnitario,
    }); // Cria um novo produto no repositório

    return { produto }; // Retorna o produto criado
  }
}
