import { prisma } from "@/lib/PrismaClient";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await prisma.$connect();
  try {
    const { nome, ...dados }: Prisma.TipoCreateInput = await req.json();
    const slug = nome
      .toLocaleLowerCase()
      .replace(new RegExp(" ", "g"), "-")
      .replace(new RegExp("\\.", "g"), "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return NextResponse.json(
      await prisma.tipo.create({ data: { nome, slug, ...dados } }),
    );
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
