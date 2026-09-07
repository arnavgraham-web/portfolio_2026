import { ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group bg-background relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold",
        className
      )}
      {...props}
    >
      {/* Expanding dot — parked fully off the left edge (invisible at rest) */}
      <div className="bg-primary absolute left-0 top-1/2 h-2 w-2 -translate-x-full -translate-y-1/2 rounded-full transition-all duration-300 group-hover:scale-[100.8]"></div>
      {/* Base label — centered */}
      <span className="relative block text-center transition-all duration-300 group-hover:opacity-0">
        {children}
      </span>
      {/* Hover label — centered with arrow */}
      <div className="text-primary-foreground absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
}
