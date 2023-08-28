import { ITextoExib } from "@/@types/ITextoExib";
import { HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function QuadroInterno({
  className,
  ...props
}: HTMLMotionProps<"div"> & { texto: ITextoExib }) {
  return (
    <motion.div
      className={twMerge(className, "relative overflow-hidden rounded-md")}
      {...props}
    >
      QuadroInterno
    </motion.div>
  );
}
