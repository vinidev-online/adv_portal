import { ITextoExib } from "@/@types/ITextoExib";
import QuadroInterno from "../ui/quadro/QuadroInterno";

export default function Principal({ textos }: { textos: ITextoExib[] }) {
  return (
    <div className="principal grid grid-cols-3 grid-rows-3 px-16">
      <QuadroInterno texto={textos[0]} className="col-span-3 row-span-2" />
      <QuadroInterno texto={textos[1]} className="col-span-1 row-span-2" />
    </div>
  );
}
