"use client";

import { useEffect, useRef } from "react";

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

export function RichTextDisplay({ content, className }: RichTextDisplayProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Convert containerstyle to style
      const elementsWithContainerStyle =
        contentRef.current.querySelectorAll("[containerstyle]");
      elementsWithContainerStyle.forEach((element) => {
        const containerStyle = element.getAttribute("containerstyle");
        if (containerStyle) {
          element.setAttribute("style", containerStyle);
          element.removeAttribute("containerstyle");
        }
      });

      // Convert wrapperstyle to style (merge with existing style)
      const elementsWithWrapperStyle =
        contentRef.current.querySelectorAll("[wrapperstyle]");
      elementsWithWrapperStyle.forEach((element) => {
        const wrapperStyle = element.getAttribute("wrapperstyle");
        const existingStyle = element.getAttribute("style") || "";

        if (wrapperStyle) {
          // Merge styles: existingStyle + wrapperStyle
          const mergedStyle = existingStyle
            ? `${existingStyle}; ${wrapperStyle}`
            : wrapperStyle;
          element.setAttribute("style", mergedStyle);
          element.removeAttribute("wrapperstyle");
        }
      });
    }
  }, [content]);

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
