import { prisma } from "@/lib/PrismaClient";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await prisma.$connect();
  try {
    let opcoes: Prisma.PaginaFindManyArgs = { orderBy: { titulo: "asc" } };

    const campos = req.nextUrl.searchParams.get("campos");
    if (campos) {
      campos.split("-").map((c) => {
        opcoes = { ...opcoes, select: { ...opcoes.select, [c]: true } };
      });
    }

    return NextResponse.json(await prisma.pagina.findMany(opcoes));
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
