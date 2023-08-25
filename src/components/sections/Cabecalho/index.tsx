"use client";
import { IIgreja } from "@/@types/IIgreja";
import LogoCirculo from "@/components/ui/icons/LogoCirculo";
import { api } from "@/lib/api";
import { Departamento, Distrito, Pagina, Tipo } from "@prisma/client";
import { Variants, motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import CabLink from "./CabLink";
import CabQuadro from "./CabQuadro";

type Igrejas = { distrito: Distrito; igrejas: IIgreja[] };

async function retornaIgrejas() {
  const distritos = (await api.get<Distrito[]>("/distrito/retorna")).data;
  return await Promise.all(
    distritos.map(async (d) => {
      const igrejas = (
        await api.get<IIgreja[]>(`/igreja/retorna?distritoId=${d.id}`)
      ).data;
      return { distrito: d, igrejas } as Igrejas;
    }),
  );
}

const retornaDepartamentos = async () =>
  (await api.get<Departamento[]>("/departamento/retorna")).data;

const retornaTipos = async () => (await api.get<Tipo[]>("/tipo/retorna")).data;

const retornaPaginas = async () =>
  (await api.get<Pagina[]>("/pagina/retorna")).data;

const CabQuadroVariants: Variants = {
  escondido: { paddingTop: "0", paddingBottom: "0", opacity: 0 },
  visivel: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
    opacity: 1,
  },
};

const CabQuadroItemVariants: Variants = {
  escondido: { opacity: 0, translateY: "-5px" },
  visivel: (custom) => ({
    opacity: 1,
    translateY: "0",
    transition: { delay: 0.05 * custom },
  }),
};

const CabQuadroColunaVariants: Variants = {
  escondido: { opacity: 0, translateX: "-5px" },
  visivel: (custom) => ({
    opacity: 1,
    translateX: "0",
    transition: { delay: 0.1 * custom },
  }),
};

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState<
    "" | "igrejas" | "departamentos" | "tipos" | "paginas"
  >("");
  const { data: igrejas } = useSWR("retornaIgrejas", retornaIgrejas);
  const { data: departamentos } = useSWR(
    "retornaDepartamentos",
    retornaDepartamentos,
  );
  const { data: tipos } = useSWR("retornaTipos", retornaTipos);
  const { data: paginas } = useSWR("retornaPaginas", retornaPaginas);

  return (
    <>
      <div className="cabecalho flex h-16 items-center justify-between bg-claro-alt/75 px-16 backdrop-blur-md">
        <Link
          href="/"
          className="transicao-hover text-[3.25rem] text-igreja-padrao hover:scale-110"
        >
          <LogoCirculo />
        </Link>
        <CabLink
          href="#"
          onMouseOver={() => setMenuAberto("igrejas")}
          className="h-full"
        >
          Igrejas
        </CabLink>
        <CabLink
          href="#"
          onMouseOver={() => setMenuAberto("departamentos")}
          className="h-full"
        >
          Departamentos
        </CabLink>
        <CabLink
          href="#"
          className="h-full"
          onMouseOver={() => setMenuAberto("tipos")}
        >
          Seções
        </CabLink>
        <CabLink
          href="/anuncio"
          className="h-full"
          onMouseOver={() => setMenuAberto("")}
        >
          Anúncios
        </CabLink>
        <CabLink
          href="#"
          className="h-full"
          onMouseOver={() => setMenuAberto("paginas")}
        >
          Sobre Nós
        </CabLink>
        <Link
          href="#"
          className="flex h-full items-center"
          onMouseOver={() => setMenuAberto("")}
        >
          <Search strokeWidth={1.5} size={18} />
        </Link>
      </div>
      <CabQuadro
        onMouseLeave={() => setMenuAberto("")}
        variants={CabQuadroVariants}
        initial="escondido"
        animate={menuAberto === "igrejas" ? "visivel" : "escondido"}
        exit="escondido"
      >
        <motion.div
          variants={CabQuadroItemVariants}
          initial="escondido"
          animate={menuAberto === "igrejas" ? "visivel" : "escondido"}
          exit="escondido"
          custom={0}
          className="w-full text-2xl font-bold tracking-tighter"
        >
          Igrejas
        </motion.div>
        {igrejas?.map((i, it) => (
          <motion.div
            variants={CabQuadroColunaVariants}
            initial="escondido"
            animate={menuAberto === "igrejas" ? "visivel" : "escondido"}
            exit="escondido"
            custom={it + 1}
            key={i.distrito.id}
            className="flex w-1/5 flex-col flex-wrap"
          >
            <Link
              href={"/distrito/" + i.distrito.slug}
              className="text-borda-escuro"
            >
              {i.distrito.nome}
            </Link>
            {i.igrejas.map((is) => (
              <CabLink href={"/igreja/" + is.slug} key={is.id}>
                {is.local.nome}
              </CabLink>
            ))}
          </motion.div>
        ))}
      </CabQuadro>
      <CabQuadro
        onMouseLeave={() => setMenuAberto("")}
        variants={CabQuadroVariants}
        initial="escondido"
        animate={menuAberto === "departamentos" ? "visivel" : "escondido"}
      >
        <motion.div
          className="content-start text-2xl font-bold tracking-tighter"
          variants={CabQuadroItemVariants}
          initial="escondido"
          animate={menuAberto === "departamentos" ? "visivel" : "escondido"}
          exit="escondido"
          custom={0}
        >
          Departamentos
        </motion.div>
        <div className="flex w-full flex-wrap content-start justify-between gap-1">
          {departamentos?.map((d, i) => (
            <CabLink
              href={d.slug!}
              key={d.id}
              className="flex w-1/4 justify-start"
            >
              <motion.div
                variants={CabQuadroItemVariants}
                initial="escondido"
                animate={
                  menuAberto === "departamentos" ? "visivel" : "escondido"
                }
                exit="escondido"
                custom={i + 1}
              >
                {d.abreviacao}
              </motion.div>
            </CabLink>
          ))}
        </div>
      </CabQuadro>
      <CabQuadro
        onMouseLeave={() => setMenuAberto("")}
        variants={CabQuadroVariants}
        initial="escondido"
        animate={menuAberto === "tipos" ? "visivel" : "escondido"}
      >
        <motion.div
          variants={CabQuadroItemVariants}
          initial="escondido"
          animate={menuAberto === "tipos" ? "visivel" : "escondido"}
          exit="escondido"
          custom={0}
          className="content-start text-2xl font-bold tracking-tighter"
        >
          Seções
        </motion.div>
        <div className="flex w-full flex-wrap content-start justify-between gap-1">
          {tipos?.map((t, i) => (
            <CabLink
              href={t.slug!}
              key={t.id}
              className="flex w-1/4 justify-start"
            >
              <motion.div
                variants={CabQuadroItemVariants}
                initial="escondido"
                animate={menuAberto === "tipos" ? "visivel" : "escondido"}
                exit="escondido"
                custom={i + 1}
              >
                {t.nome}
              </motion.div>
            </CabLink>
          ))}
        </div>
      </CabQuadro>
      <CabQuadro
        onMouseLeave={() => setMenuAberto("")}
        variants={CabQuadroVariants}
        initial="escondido"
        animate={menuAberto === "paginas" ? "visivel" : "escondido"}
      >
        <motion.div
          variants={CabQuadroItemVariants}
          initial="escondido"
          animate={menuAberto === "paginas" ? "visivel" : "escondido"}
          exit="escondido"
          custom={0}
          className="content-start text-2xl font-bold tracking-tighter"
        >
          Sobre Nós
        </motion.div>
        <div className="flex w-full flex-wrap content-start justify-between gap-1">
          {paginas?.map((p, i) => (
            <CabLink
              href={p.slug!}
              key={p.id}
              className="flex w-1/4 justify-start"
            >
              <motion.div
                variants={CabQuadroItemVariants}
                initial="escondido"
                animate={menuAberto === "paginas" ? "visivel" : "escondido"}
                exit="escondido"
                custom={i + 1}
              >
                {p.titulo}
              </motion.div>
            </CabLink>
          ))}
        </div>
      </CabQuadro>
    </>
  );
}
