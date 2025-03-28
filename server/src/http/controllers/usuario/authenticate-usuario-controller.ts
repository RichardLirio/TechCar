import { CredenciaisUsuarioInvalidaError } from "@/use-cases/erros/credencias-usuario-invalidas";
import { makeAuthenticateUsuarioUseCase } from "@/use-cases/factories/make-authenticate-usuario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

//controller para autenticar o usuário
export async function AuthenticateUsuario(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }); // // Definindo o esquema para o corpo da requisição usando Zod

  const { email, password } = authenticateBodySchema.parse(request.body); // // Fazendo o parse e validando o corpo da requisição de acordo com o esquema definido

  try {
    const authenticateUseCase = makeAuthenticateUsuarioUseCase(); // // Criando uma instância do caso de uso de autenticação

    const { usuario } = await authenticateUseCase.execute({ email, password }); //executo o metodo execute criado dentro da classe do use case

    const token = await reply.jwtSign(
      {
        role: usuario.role,
      },
      {
        sign: {
          sub: usuario.id,
        },
      }
    ); // // Cria o token JWT com o id do usuário e o papel (role) do usuário
    const refreshToken = await reply.jwtSign(
      {
        role: usuario.role,
      },
      {
        sign: {
          sub: usuario.id,
          expiresIn: "7d",
        },
      }
    ); // // Cria o refresh token JWT com o id do usuário e o papel (role) do usuário, com validade de 7 dias

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true, //https
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token }); // // Define o cookie de refresh token e envia a resposta com o token JWT
  } catch (error) {
    if (error instanceof CredenciaisUsuarioInvalidaError) {
      return reply.status(400).send({
        message: error.message,
      });
    } // // Verifica se o erro é uma instância de CredenciaisUsuarioInvalidaError

    return error; // // Retorna o erro caso não seja do tipo esperado
  }
}
