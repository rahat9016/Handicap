import { cn } from "@/lib/utils";
import React from "react";

export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-primary font-semibold font-inter text-lg md:text-xl lg:text-2xl",
        className
      )}
    >
      {children}
    </h3>
  );
}
