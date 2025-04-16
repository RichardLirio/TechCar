import { Produto } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ProdutoRepository } from "@/repositories/produto-repository";
import { ProdutoAlreadyExistsError } from "../erros/produto-ja-existe-erro";
import { formatarDescricao } from "@/value-object/FormatarDescricao";

interface UpdateProdutoUseCaseParams {
  id: number;
  nome: string;
  quantidade: number;
  valorUnitario: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface UpdateProdutoUseCaseResponse {
  produto: Produto;
} // Cria uma interface para a resposta do caso de uso

export class UpdateProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    id,
    nome,
    quantidade,
    valorUnitario,
  }: UpdateProdutoUseCaseParams): Promise<UpdateProdutoUseCaseResponse> {
    const nomeFormatado = await formatarDescricao(nome); // Formata o nome do produto
    const ProdutoWithSameNome = await this.produtoRepository.findByNome(
      nomeFormatado
    ); // Verifica se já existe um produto com o mesmo cnpj

    if (ProdutoWithSameNome && ProdutoWithSameNome.id != Number(id)) {
      throw new ProdutoAlreadyExistsError(); // Lança um erro se o produto já existir
    }

    const produto = await this.produtoRepository.update({
      id,
      nome: nomeFormatado,
      quantidade,
      valorUnitario,
    }); // Cria um novo produto no repositório

    if (!produto) {
      throw new ResourceNotFoundError(); // Lança um erro se o produto não for encontrado
    }

    return { produto }; //Retorna o produto atualizado
  }
}
