import { NextResponse } from 'next/server';
import { ObjectId } from 'bson';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // Extração segura do ID da URL (funciona em todas versões)
    const id = request.url.split('/').pop().split('?')[0];

    console.log('ID extraído:', id); // Para debug

    // Validação rigorosa
    if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "ID inválido",
          details: "O ID deve ser um ObjectId válido do MongoDB"
        },
        { status: 400 }
      );
    }

    // Consulta ao banco de dados
    const product = await prisma.product.findUnique({
      where: { id: new ObjectId(id).toString() },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        image: true
      }
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Produto não encontrado"
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });

  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno do servidor",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}