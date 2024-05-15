import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", className, ...props }: ButtonProps) {
  const classNames = variant === "primary" ? "bg-stone-950 text-white h-16 rounded-lg" : "bg-transparent border-stone-950 h-16 rounded-lg border";
  return <button className={[classNames, className].filter(Boolean).join(" ")} {...props} >{children}</button>
}
