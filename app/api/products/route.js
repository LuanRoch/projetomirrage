import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// POST - Criar produto (Admin)
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, price, image } = body;

    // Validação
    if (!title || !description || !price || !image) {
      return NextResponse.json(
        { error: "Preencha todos os campos!" },
        { status: 400 }
      );
    }

    // Autenticação
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, "appSecret");
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso negado" },
        { status: 403 }
      );
    }

    // Criação do produto
    const product = await prisma.product.create({
      data: { title, description, price: Number(price), image }
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json(
      { error: "Erro no servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET - Listar produtos
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}