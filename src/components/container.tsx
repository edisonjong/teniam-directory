import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    // <div
    //   className={cn(
    //     "container max-w-7xl mx-auto ",
    //     "flex  justify-center items-center", // Flexbox for centering
    //     className
    //   )}
    // >
    //   {children}
    // </div>
    // max-w-6xl
    <div className={cn("container ", "mx-auto", "max-w-7xl", className)}>
      {children}
    </div>
  );
}
