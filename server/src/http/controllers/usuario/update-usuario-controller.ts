import { ResourceNotFoundError } from "@/use-cases/erros/recurso-nao-encontrado";
import { UserAlreadyExistsError } from "@/use-cases/erros/usuario-ja-existe-erro";
import { makeUpdateUsuarioUseCase } from "@/use-cases/factories/make-update-usuario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

/// Controller to handle user update
export async function UpdateUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "USER"]),
  }); // // Definindo o esquema para o corpo da requisição usando Zod

  const validateUserParamsSchema = z.object({
    id: z.string().uuid(),
  }); // // Definindo o esquema para os parâmetros da requisição usando Zod

  const { name, email, password, role } = createUserBodySchema.parse(
    request.body
  ); // // Fazendo o parse e validando o corpo da requisição de acordo com o esquema definido

  const { id } = validateUserParamsSchema.parse(request.params); // // Fazendo o parse e validando os parâmetros da requisição de acordo com o esquema definido

  try {
    const updateUserUseCase = makeUpdateUsuarioUseCase();
    const { usuario } = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      role,
    }); // // Criando uma instância do caso de uso de atualização de usuário e executando o método execute com os dados validados

    return reply.code(200).send({ usuario }); // // Envia uma resposta 200 OK com os dados do usuário atualizado
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      // // Verifica se o erro é uma instância de UserAlreadyExistsError
      return reply.status(409).send({
        message: error.message,
      });
    }

    if (error instanceof ResourceNotFoundError) {
      // // Verifica se o erro é uma instância de ResourceNotFoundError
      return reply.status(404).send({
        message: error.message,
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }
}
