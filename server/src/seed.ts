import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { env } from "./env";

const prisma = new PrismaClient();

export async function seed() {
  try {
    // Verifica se o usuário padrão já existe
    const existingUser = await prisma.usuario.findUnique({
      where: {
        email: env.ADMIN_EMAIL, // Email do usuário padrão
      },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 6); // Senha padrão criptografada

      await prisma.usuario.create({
        data: {
          email: env.ADMIN_EMAIL,
          password_hash: hashedPassword,
          name: "Admin User",
          role: "ADMIN",
        },
      });

      console.log("Usuário padrão criado com sucesso!");
    } else {
    }
  } catch (error) {
    console.error("Erro ao criar usuário padrão:", error);
  } finally {
    await prisma.$disconnect();
  }
}
