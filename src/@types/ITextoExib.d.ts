import { Departamento, Tipo } from "@prisma/client";
import { IEvento } from "./IEvento";

interface ITextoExib {
  id: string;
  imagem?: string;
  evento?: IEvento;
  titulo?: string;
  slug: string;
  subtitulo?: string;
  conteudo: string;
  tipo: Tipo;
  departamentos: Departamento[];
}
