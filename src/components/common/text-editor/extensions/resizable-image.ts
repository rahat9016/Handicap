import { type CommandProps, type Editor, type NodeViewProps, type NodeViewRendererProps } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { ResizableImageAttributes } from "../types/editor";

const ResizableImage = Image.extend({
  name: "resizableImage",

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "300px",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-width") || element.style.width || "300px",
        renderHTML: (attributes: ResizableImageAttributes) => {
          const { width, height, wrap, align } = attributes;
          let style = `width: ${width}; height: ${
            height || "auto"
          }; max-width: 100%;`;

          if (wrap === "inline") {
            style += " display: inline; vertical-align: middle; margin: 0 4px;";
          } else if (wrap === "wrap") {
            if (align === "left") {
              style += " float: left; margin: 0 12px 6px 0; clear: both;";
            } else if (align === "right") {
              style += " float: right; margin: 0 0 6px 12px; clear: both;";
            } else {
              style += " float: left; margin: 0 12px 6px 0; clear: both;";
            }
          } else if (wrap === "break") {
            if (align === "center") {
              style +=
                " display: block; margin: 12px auto; float: none; clear: both;";
            } else if (align === "right") {
              style +=
                " display: block; margin: 12px 0 12px auto; float: none; clear: both;";
            } else {
              style +=
                " display: block; margin: 12px auto; float: none; clear: both;";
            }
          }

          return {
            "data-width": width,
            "data-height": height,
            "data-wrap": wrap,
            "data-align": align,
            class: `resizable-image image-wrap-${wrap} image-align-${
              align || "left"
            }`,
            style,
          };
        },
      },
      height: {
        default: "auto",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-height") || element.style.height || "auto",
        renderHTML: () => ({}),
      },
      wrap: {
        default: "inline",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-wrap") || "inline",
        renderHTML: () => ({}),
      },
      align: {
        default: "left",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-align") || "left",
        renderHTML: () => ({}),
      },
    };
  },

  addCommands() {
    return {
      // accept a wider options shape to remain compatible with the base Image command
      setImage:
        (options: unknown) =>
        ({ commands }: CommandProps) =>
          commands.insertContent({
            type: this.name,
            attrs: options as ResizableImageAttributes,
          }),
      updateImage:
        (options: unknown) =>
        ({ chain }: CommandProps) =>
          chain().updateAttributes(this.name, options as Partial<ResizableImageAttributes>).run(),
      setImageSize:
        (width: string, height: string = "auto") =>
        ({ chain }: CommandProps) =>
          chain().updateAttributes(this.name, { width, height }).run(),
      setImageWrap:
        (wrap: "inline" | "wrap" | "break") =>
        ({ chain }: CommandProps) =>
          chain().updateAttributes(this.name, { wrap }).run(),
      setImageAlign:
        (align: "left" | "center" | "right") =>
        ({ chain }: CommandProps) =>
          chain().updateAttributes(this.name, { align }).run(),
    };
  },

  addNodeView() {
    return (props: NodeViewRendererProps) => {
      const { node, getPos, editor } = props as NodeViewProps & { editor: Editor };
      const dom = document.createElement("span");
      dom.className = `image-resize-container image-wrap-${node.attrs.wrap}`;
      dom.setAttribute("data-wrap", node.attrs.wrap);

      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt || "";
      img.title = node.attrs.title || "";
      img.className = "resizable-image";
      img.style.width = node.attrs.width;
      img.style.height = node.attrs.height;
      img.style.maxWidth = "100%";

      // Apply wrapping styles
      switch (node.attrs.wrap) {
        case "wrap":
          img.style.float = "left";
          img.style.marginRight = "12px";
          img.style.marginBottom = "6px";
          break;
        case "break":
          img.style.display = "block";
          img.style.margin = "12px auto";
          img.style.float = "none";
          break;
        default:
          img.style.display = "inline";
          img.style.verticalAlign = "middle";
          img.style.margin = "0 4px";
      }

      // Resize handle
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "resize-handle";
      resizeHandle.innerHTML = "↘";
      resizeHandle.style.cssText = `
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 12px;
        height: 12px;
        background: #3b82f6;
        border: 1px solid white;
        border-radius: 2px;
        cursor: se-resize;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: white;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 10;
      `;

      dom.appendChild(img);
      dom.appendChild(resizeHandle);

      let isSelected = false;

      const updateResizeHandle = () => {
        resizeHandle.style.opacity = isSelected ? "1" : "0";
      };

      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const pos = getPos();
        if (pos !== undefined) {
          editor.commands.setNodeSelection(pos);
          isSelected = true;
          updateResizeHandle();
        }
      };

      img.addEventListener("click", handleClick);

      const updateSelection = () => {
        const { selection } = editor.state;
        const pos = getPos();
        if (pos === undefined) return;
        isSelected =
          selection.from <= pos && selection.to >= pos + node.nodeSize;
        updateResizeHandle();
      };

      editor.on("selectionUpdate", updateSelection);

      // Resize logic
      let isResizing = false;
      let startX = 0,
        startY = 0,
        startWidth = 0,
        startHeight = 0;

      const startResize = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(img.style.width) || img.offsetWidth;
        startHeight = parseInt(img.style.height) || img.offsetHeight;

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
      };

      const resize = (e: MouseEvent) => {
        if (!isResizing) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const newWidth = Math.max(50, startWidth + deltaX);
        const newHeight = Math.max(50, startHeight + deltaY);
        img.style.width = `${newWidth}px`;
        img.style.height = `${newHeight}px`;
      };

      const stopResize = () => {
        if (!isResizing) return;
        isResizing = false;
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);

        const pos = getPos();
        if (pos !== undefined) {
          editor.commands.command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              width: img.style.width,
              height: img.style.height,
            });
            return true;
          });
        }
      };

      resizeHandle.addEventListener("mousedown", startResize);

      return {
        dom,
        destroy: () => {
          img.removeEventListener("click", handleClick);
          resizeHandle.removeEventListener("mousedown", startResize);
          document.removeEventListener("mousemove", resize);
          document.removeEventListener("mouseup", stopResize);
          editor.off("selectionUpdate", updateSelection);
        },
      };
    };
  },
});

export default ResizableImage;
