import { prisma } from "@/lib/PrismaClient";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await prisma.$connect();
  try {
    const dados: Prisma.ComentarioCreateInput = await req.json();

    return NextResponse.json(await prisma.comentario.create({ data: dados }));
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
