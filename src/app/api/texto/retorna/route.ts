import { prisma } from "@/lib/PrismaClient";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await prisma.$connect();
  try {
    let opcoes: Prisma.TextoFindManyArgs = { orderBy: { publicadoEm: "desc" } };

    const campos = req.nextUrl.searchParams.get("campos");
    if (campos) {
      campos.split("-").map((c) => {
        opcoes = { ...opcoes, select: { ...opcoes.select, [c]: true } };
      });
    }

    const igrejaId = req.nextUrl.searchParams.get("igrejaId");
    if (igrejaId) {
      opcoes = {
        ...opcoes,
        where: { ...opcoes.where, igrejaId },
      };
    }

    const tipoId = req.nextUrl.searchParams.get("tipoId");
    if (tipoId) {
      opcoes = {
        ...opcoes,
        where: { ...opcoes.where, tipo: { id: tipoId } },
      };
    }

    const limite = req.nextUrl.searchParams.get("limite");
    if (limite) {
      opcoes = { ...opcoes, take: Number.parseInt(limite) };
    }

    return NextResponse.json(await prisma.texto.findMany(opcoes));
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
