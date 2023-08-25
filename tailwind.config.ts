import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
    },
    colors: {
      transparent: "transparent",
      escuro: { padrao: "#1d1d1f", alt: "#000000" },
      claro: { padrao: "#f1f1f6", alt: "#ffffff" },
      borda: { escuro: "#737378", claro: "#87878c" },
      igreja: { claro: "#96b6f3", padrao: "#2e6de7", escuro: "#173673" },
      asa: { claro: "#969ff3", padrao: "#2e40e7", escuro: "#172073" },
      aventureiros: { claro: "#a496f3", padrao: "#492ee7", escuro: "#241773" },
      comunicacao: { claro: "#bb96f3", padrao: "#772ee7", escuro: "#3b1773" },
      desbravadores: { claro: "#d196f3", padrao: "#a42ee7", escuro: "#521773" },
      educacao: { claro: "#e896f3", padrao: "#d12ee7", escuro: "#681773" },
      "esc-sabatina": {
        claro: "#f396e7",
        padrao: "#e72ed0",
        escuro: "#731768",
      },
      "esp-profecia": {
        claro: "#f396d1",
        padrao: "#e72ea3",
        escuro: "#731751",
      },
      evangelismo: { claro: "#f396ba", padrao: "#e72e76", escuro: "#73173b" },
      "lib-religiosa": {
        claro: "#f396a3",
        padrao: "#e72e48",
        escuro: "#731724",
      },
      crianca: { claro: "#f3a096", padrao: "#e7412e", escuro: "#732017" },
      familia: { claro: "#f3b696", padrao: "#e76e2e", escuro: "#733717" },
      mulher: { claro: "#f3cd96", padrao: "#e79b2e", escuro: "#734d17" },
      musica: { claro: "#f3e396", padrao: "#e7c82e", escuro: "#736417" },
      recepcao: { claro: "#ecf396", padrao: "#d9e72e", escuro: "#6c7317" },
      publicacoes: { claro: "#d5f396", padrao: "#abe72e", escuro: "#557317" },
      adolescente: { claro: "#bef396", padrao: "#7ee72e", escuro: "#3f7317" },
      jovem: { claro: "#a8f396", padrao: "#51e72e", escuro: "#287317" },
      "min-pessoal": { claro: "#96f39b", padrao: "#2ee738", escuro: "#17731c" },
      "mis-global": { claro: "#96f3b2", padrao: "#2ee765", escuro: "#177332" },
      mordomia: { claro: "#96f3c9", padrao: "#2ee793", escuro: "#177349" },
      saude: { claro: "#96f3df", padrao: "#2ee7c0", escuro: "#177360" },
      voluntarios: { claro: "#96f0f3", padrao: "#2ee1e7", escuro: "#177073" },
    },
  },
  plugins: [],
};
export default config;
