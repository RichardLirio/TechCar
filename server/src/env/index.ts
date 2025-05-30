import "dotenv/config";
import { z } from "zod";

// This file is responsible for loading and validating environment variables using Zod
const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string(),
});

//valida de as informações estão no padrão solicitado no envSchema
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
