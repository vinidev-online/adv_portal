import Cabecalho from "@/components/sections/Cabecalho";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const sans = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "variable",
});

const mono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Adventistas Portal",
  description:
    "Site de Notícias da Igreja Adventista do Sétimo Dia - Araguaína/TO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-claro-padrao text-escuro-padrao h-full min-h-screen w-full font-sans text-lg font-normal leading-none tracking-tight subpixel-antialiased">
        <Cabecalho />
        {children}
      </body>
    </html>
  );
}
