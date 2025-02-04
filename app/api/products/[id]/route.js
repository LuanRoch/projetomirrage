

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_, { params }) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get product" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
