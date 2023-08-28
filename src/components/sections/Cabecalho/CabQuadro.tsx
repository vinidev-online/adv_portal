import { HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export default function CabQuadro({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={twMerge(
        "fixed top-16 z-[98] flex max-h-[calc(80vh-4rem)] min-h-0 w-full flex-wrap content-start justify-between gap-4 bg-claro-alt/75 object-top px-16 text-base backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
