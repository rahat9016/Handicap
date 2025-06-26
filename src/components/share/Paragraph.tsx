import { cn } from "@/lib/utils";
import React from "react";

export default function Paragraph({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-[#7A7A8E] font-normal font-inter text-xs lg:text-sm",
        className
      )}
    >
      {children}
    </h3>
  );
}
