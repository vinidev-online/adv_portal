import { prisma } from "@/lib/PrismaClient";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await prisma.$connect();
  try {
    const { data, igreja, ...dados }: Prisma.AnuncioCreateInput =
      await req.json();
    const igrejaRes = await prisma.igreja.findFirst({
      where: { id: igreja.connect?.id },
    });

    const slug =
      igrejaRes
        ?.slug!.toLocaleLowerCase()
        .replace(new RegExp(" ", "g"), "-")
        .replace(new RegExp("\\.", "g"), "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") +
      format(new Date(data), "-dd-MM-yyyy-hh-mm-ss", { locale: ptBR });

    return NextResponse.json(
      await prisma.anuncio.create({
        data: { data, igreja, slug, ...dados },
      }),
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
