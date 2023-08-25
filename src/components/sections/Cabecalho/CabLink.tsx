import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function CabLink({
  children,
  className,
  href,
  ...props
}: LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    className?: string;
  }) {
  return (
    <Link
      href={href}
      className={twMerge(
        className,
        "transicao-hover flex items-center tracking-tighter hover:text-borda-claro/75",
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
