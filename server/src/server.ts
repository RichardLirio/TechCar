import { app } from "./app";
import { env } from "./env";
import { seed } from "./seed";

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(async () => {
    await seed(); //cria usuario admin padrão para o sistema
    console.log("🚀 HTTP Server is Running!");
  });
