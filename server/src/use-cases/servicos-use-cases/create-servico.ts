import { Servico } from "@prisma/client";
import { formatarDescricao } from "@/value-object/FormatarDescricao";
import { ServicoRepository } from "@/repositories/servico-repository";
import { ServicoAlreadyExistsError } from "../erros/servico-ja-existe-erro";

interface CreateServicoUseCaseParams {
  descricao: string;
  valorServico: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface CreateServicoUseCaseResponse {
  servico: Servico;
} // Cria uma interface para a resposta do caso de uso

export class CreateServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}

  async execute({
    descricao,
    valorServico,
  }: CreateServicoUseCaseParams): Promise<CreateServicoUseCaseResponse> {
    const descricaoFormatada = await formatarDescricao(descricao); // Formata o nome do servico

    const servicoComMesmoNome = await this.servicoRepository.findByNome(
      descricaoFormatada
    ); // Verifica se já existe um Servico com o mesmo nome

    if (servicoComMesmoNome) {
      throw new ServicoAlreadyExistsError();
    } // Lança um erro se o servico já existir

    const servico = await this.servicoRepository.create({
      descricao: descricaoFormatada,
      valorServico,
    }); // Cria um novo servico no repositório

    return { servico }; // Retorna o servico criado
  }
}
