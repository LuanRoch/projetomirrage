import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();

  const { title, description, price, image } = body;

  if (!title || !description || !price || !image) {
    return NextResponse.json(
      { error: "You must fill all the required fields!" },
      { status: 200 }
    );
  }

  try {
    const tokenCookie = await cookies();
    const getToken = tokenCookie.get("token");

    if (getToken) {
      const token = jwt.verify(getToken.value, "appSecret");

      const userId = token.id;

      if (!userId) {
        return NextResponse.json(
          { error: "Unauthorized request!" },
          { status: 200 }
        );
      }

      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return NextResponse.json(
          { error: "Unauthorized request!" },
          { status: 200 }
        );
      }

      if (user.role !== "ADMIN") {
        return NextResponse.json(
          { error: "Unauthorized request!" },
          { status: 200 }
        );
      }

      const product = await prisma.product.create({
        data: {
          title,
          description,
          image,
          price: parseFloat(price),
        },
      });

      return NextResponse.json(product, { status: 201 });
    }

    return NextResponse.json(
      { error: "Unauthorized request!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);

    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get products" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}