import { prisma } from "@/lib/PrismaClient";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await prisma.$connect();
  try {
    let opcoes: Prisma.AnuncioCountArgs = {};

    return NextResponse.json(await prisma.anuncio.count(opcoes));
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
    return NextResponse.json({
      sucesso: false,
      mensagem: JSON.stringify(e, null, 2),
    });
  } finally {
    await prisma.$disconnect();
  }
}
