import { prisma } from "@/lib/PrismaClient";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await prisma.$connect();
  try {
    let opcoes: Prisma.TagCountArgs = {};
    const busca = req.nextUrl.searchParams.get("busca");

    if (busca) {
      opcoes = { ...opcoes, where: { nome: busca } };
    }

    return NextResponse.json(await prisma.tag.count(opcoes));
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
