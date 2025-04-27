import { Servico } from "@prisma/client";
import { ResourceNotFoundError } from "../erros/recurso-nao-encontrado";
import { ServicoRepository } from "@/repositories/servico-repository";
import { ServicoAlreadyExistsError } from "../erros/servico-ja-existe-erro";
import { formatarDescricao } from "@/value-object/FormatarDescricao";

interface UpdateServicoUseCaseParams {
  id: number;
  descricao: string;
  valorServico: number;
} // Cria uma interface para os parâmetros de entrada do caso de uso

interface UpdateServicoUseCaseResponse {
  servico: Servico;
} // Cria uma interface para a resposta do caso de uso

export class UpdateServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}

  async execute({
    id,
    descricao,
    valorServico,
  }: UpdateServicoUseCaseParams): Promise<UpdateServicoUseCaseResponse> {
    const servicoExiste = await this.servicoRepository.findById(id);

    if (!servicoExiste) {
      throw new ResourceNotFoundError(); // Lança um erro se o servico não for encontrado
    }

    const nomeFormatado = await formatarDescricao(descricao); // Formata o nome do servico
    const ServicoWithSameNome = await this.servicoRepository.findByNome(
      nomeFormatado
    ); // Verifica se já existe um servico com o mesmo nome

    if (ServicoWithSameNome && ServicoWithSameNome.id != Number(id)) {
      throw new ServicoAlreadyExistsError(); // Lança um erro se o servico já existir
    }

    const servico = await this.servicoRepository.update({
      id,
      descricao: nomeFormatado,
      valorServico,
    }); // Cria um novo servico no repositório

    return { servico }; //Retorna o servico atualizado
  }
}
