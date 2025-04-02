import fastify from "fastify";
import { usuarioRoutes } from "./http/controllers/usuario/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { clientRoutes } from "./http/controllers/cliente/routes";
import { veiculoRoutes } from "./http/controllers/veiculos/routes";

export const app = fastify(); //instacia o app
//registra o fastify jwt para autenticação
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "1d",
  },
});

app.register(fastifyCors, {
  origin: true,
  credentials: true,
});

app.register(fastifyCookie);

app.register(usuarioRoutes); //rotas de usuario
app.register(clientRoutes); //rotas de clientes
app.register(veiculoRoutes); //rota de veiculos

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() }); //erro quando falta alguma variavel de ambiente
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
