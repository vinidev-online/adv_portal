import { prisma } from "@/lib/PrismaClient";
import { Prisma, UsuarioTipo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await prisma.$connect();
  try {
    let opcoes: Prisma.UsuarioCountArgs = {};
    const tipo = req.nextUrl.searchParams.get("tipo");
    if (tipo) {
      opcoes = { ...opcoes, where: { tipoUsuario: tipo as UsuarioTipo } };
    }

    return NextResponse.json(await prisma.usuario.count(opcoes));
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
