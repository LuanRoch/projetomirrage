import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Porfavvor digite um email e senha " },
      { status: 200 }
    );
  }

  try {
    const isUserCreatedBefore = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserCreatedBefore) {
      return NextResponse.json(
        { error: "Esse email já foi ustilizado" },
        { status: 200 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hash,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Ocorreu um error, Porfavor tente mais tarde!" },
        { status: 200 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ocorreu um error, Porfavor tente novamente!" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
