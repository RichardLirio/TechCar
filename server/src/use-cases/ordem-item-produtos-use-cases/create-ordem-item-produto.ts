import { OrdemItemProdutoRepository } from "@/repositories/ordem-item-produtos-repository";
import { OrdemServicoRepository } from "@/repositories/ordem-servico-repository";
import { ProdutoRepository } from "@/repositories/produto-repository";
import { OrdemItem } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ProdutoComEstoqueInsuficienteError } from "../erros/produto-com-estoque-insuficiente-erro";

export interface CreateOrdemItemProdutoUseCaseParams {
  ordemId: number;
  produtoId: number;
  quantidadeUsada: number;
  valorUnitarioPeca: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface CreateOrdemItemProdutoUseCaseResponse {
  ordemItemProduto: OrdemItem;
} // Cria uma interface para a resposta do caso de uso

export class CreateOrdemItemProdutoUseCase {
  constructor(
    private ordemitemprodutoRepository: OrdemItemProdutoRepository,
    private produtoRepository: ProdutoRepository,
    private ordemServicoRepository: OrdemServicoRepository
  ) {}

  async execute({
    ordemId,
    produtoId,
    quantidadeUsada,
    valorUnitarioPeca,
  }: CreateOrdemItemProdutoUseCaseParams): Promise<CreateOrdemItemProdutoUseCaseResponse> {
    const ordemServico = await this.ordemServicoRepository.findById(ordemId);

    if (!ordemServico) {
      throw new ResourceNotFoundError();
    } // Lança um erro caso o recurso enviado não exista

    const produto = await this.produtoRepository.findById(produtoId);

    if (!produto) {
      throw new ResourceNotFoundError();
    } // Lança um erro caso o recurso enviado não exista

    //verificar se o produto possui estoque suficiente
    if (produto.quantidade < quantidadeUsada) {
      throw new ProdutoComEstoqueInsuficienteError();
    }

    const ordemItemProduto = await this.ordemitemprodutoRepository.create({
      ordemId,
      produtoId,
      quantidadeUsada,
      valorUnitarioPeca,
    }); // Cria um novo ordemitemproduto no repositório

    return { ordemItemProduto }; // Retorna o ordemitemproduto criado
  }
}
