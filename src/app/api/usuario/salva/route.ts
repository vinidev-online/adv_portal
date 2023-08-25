import { prisma } from "@/lib/PrismaClient";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await prisma.$connect();
  try {
    const { nome, email, ...dados }: Prisma.UsuarioCreateInput =
      await req.json();

    const slug = nome
      .toLocaleLowerCase()
      .replace(new RegExp(" ", "g"), "-")
      .replace(new RegExp("\\.", "g"), "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const senha = hashSync(email.split("@")[0], 12);

    return NextResponse.json(
      await prisma.usuario.create({
        data: { nome, email, senha, slug, ...dados },
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
