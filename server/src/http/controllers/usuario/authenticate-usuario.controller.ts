import { CredenciaisUsuarioInvalidaError } from "@/use-cases/erros/credencias-usuario-invalidas";
import { makeAuthenticateUsuarioUseCase } from "@/use-cases/factories/make-authenticate-usuario-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function AuthenticateUsuario(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUsuarioUseCase();

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
    );

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
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true, //https
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof CredenciaisUsuarioInvalidaError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    return error;
  }
}
