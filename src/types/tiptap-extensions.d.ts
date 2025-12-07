// tiptap-extensions.d.ts
import "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      /**
       * Insert a new image with custom attributes
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string;
        height?: string;
        wrap?: "inline" | "wrap" | "break";
      }) => ReturnType;

      /**
       * Update image attributes
       */
      updateImage: (options: {
        width?: string;
        height?: string;
        wrap?: "inline" | "wrap" | "break";
      }) => ReturnType;

      /**
       * Change image dimensions
       */
      setImageSize: (width: string, height?: string) => ReturnType;

      /**
       * Change image wrapping mode
       */
      setImageWrap: (wrap: "inline" | "wrap" | "break") => ReturnType;
    };
  }
}
