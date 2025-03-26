import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface createUserCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function CreateUserUseCase({
  name,
  email,
  password,
}: createUserCaseRequest) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.usuario.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("Email já existe.");
  }

  await prisma.usuario.create({
    data: {
      name,
      email,
      password_hash: password_hash,
    },
  });
}
