import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateUsuarioUseCase } from "@/use-cases/factories/make-create-usuario-use-case";
import { UserAlreadyExistsError } from "@/use-cases/erros/usuario-ja-existe-erro";

// Controller to handle user creation
export async function CreateUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  }); // // Definindo o esquema para o corpo da requisição usando Zod

  const { name, email, password } = createUserBodySchema.parse(request.body); // // Fazendo o parse e validando o corpo da requisição de acordo com o esquema definido

  try {
    const createUsuarioUseCase = makeCreateUsuarioUseCase();
    await createUsuarioUseCase.execute({ name, email, password }); // // // Criando uma instância do caso de uso de criação de usuário e executando o método execute com os dados validados
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message, // Verifica se o erro é uma instância de UserAlreadyExistsError
      });
    }

    return reply.status(500).send(); //TODO: fix me
  }

  return reply.status(201).send(); // Envia uma resposta 201 Created se o usuário for criado com sucesso
}
