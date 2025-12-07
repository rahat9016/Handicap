// "use client";
// import { usePost } from "@/hooks/usePost";
// import { type CommandProps } from "@tiptap/core";
// import { Color } from "@tiptap/extension-color";
// import Image from "@tiptap/extension-image";
// import TextAlign from "@tiptap/extension-text-align";
// import { TextStyle } from "@tiptap/extension-text-style";
// import Underline from "@tiptap/extension-underline";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React, { ChangeEvent, useEffect, useRef, useState } from "react";
// import "./TextEditor.css";
// import { ResizableImageAttributes, ToolbarButtonProps } from "./types/editor";
// import { NodeSelection } from "prosemirror-state";

// // Custom image extension with resize functionality and text wrapping
// // const ResizableImage = Image.extend({
// //   name: "resizableImage",

// //   addAttributes() {
// //     return {
// //       ...this.parent?.(),
// //       width: {
// //         default: "300px",
// //         parseHTML: (element) =>
// //           element.getAttribute("data-width") || element.style.width || "300px",
// //         renderHTML: (attributes) => {
// //           let style = `width: ${attributes.width}; height: ${
// //             attributes.height || "auto"
// //           }; max-width: 100%;`;

// //           // Add inline styles based on wrap mode
// //           if (attributes.wrap === "inline") {
// //             style += " display: inline; vertical-align: middle; margin: 0 4px;";
// //           } else if (attributes.wrap === "wrap") {
// //             style += " float: left; margin: 0 12px 6px 0; clear: both;";
// //           } else if (attributes.wrap === "break") {
// //             style +=
// //               " display: block; margin: 12px auto; float: none; clear: both;";
// //           }

// //           return {
// //             "data-width": attributes.width,
// //             "data-height": attributes.height,
// //             "data-wrap": attributes.wrap,
// //             class: `resizable-image image-wrap-${attributes.wrap}`,
// //             style: style,
// //           };
// //         },
// //       },
// //       height: {
// //         default: "auto",
// //         parseHTML: (element) =>
// //           element.getAttribute("data-height") || element.style.height || "auto",
// //         renderHTML: (attributes) => {
// //           return {}; // Handled in width attribute
// //         },
// //       },
// //       wrap: {
// //         default: "inline",
// //         parseHTML: (element) => element.getAttribute("data-wrap") || "inline",
// //         renderHTML: (attributes) => {
// //           return {}; // Handled in width attribute
// //         },
// //       },
// //     };
// //   },

// //   addCommands() {
// //     return {
// //       setImage:
// //         (options: ImageAttributes) =>
// //         ({ commands }: any) => {
// //           return commands.insertContent({
// //             type: this.name,
// //             attrs: options,
// //           });
// //         },
// //       updateImage:
// //         (options: Partial<ImageAttributes>) =>
// //         ({ chain }: any) => {
// //           return chain().updateAttributes(this.name, options).run();
// //         },
// //       setImageSize:
// //         (width: string, height: string = "auto") =>
// //         ({ chain }: any) => {
// //           return chain().updateAttributes(this.name, { width, height }).run();
// //         },
// //       setImageWrap:
// //         (wrap: "inline" | "wrap" | "break") =>
// //         ({ chain }: any) => {
// //           return chain().updateAttributes(this.name, { wrap }).run();
// //         },
// //     };
// //   },

// //   addNodeView() {
// //     return ({ node, getPos, editor }) => {
// //       const dom = document.createElement("span");
// //       dom.className = `image-resize-container image-wrap-${node.attrs.wrap}`;
// //       dom.setAttribute("data-wrap", node.attrs.wrap);

// //       const img = document.createElement("img");
// //       img.src = node.attrs.src;
// //       img.alt = node.attrs.alt;
// //       img.title = node.attrs.title;
// //       img.className = "resizable-image";
// //       img.style.width = node.attrs.width;
// //       img.style.height = node.attrs.height;
// //       img.style.maxWidth = "100%";

// //       // Apply wrap style
// //       if (node.attrs.wrap === "wrap") {
// //         img.style.float = "left";
// //         img.style.marginRight = "12px";
// //         img.style.marginBottom = "6px";
// //       } else if (node.attrs.wrap === "break") {
// //         img.style.float = "none";
// //         img.style.display = "block";
// //         img.style.marginLeft = "auto";
// //         img.style.marginRight = "auto";
// //       } else {
// //         // inline
// //         img.style.float = "none";
// //         img.style.display = "inline";
// //         img.style.verticalAlign = "middle";
// //         img.style.margin = "0 4px";
// //       }

// //       // Create resize handle
// //       const resizeHandle = document.createElement("div");
// //       resizeHandle.className = "resize-handle";
// //       resizeHandle.innerHTML = "↘";
// //       resizeHandle.style.cssText = `
// //         position: absolute;
// //         bottom: 2px;
// //         right: 2px;
// //         width: 12px;
// //         height: 12px;
// //         background: #3b82f6;
// //         border: 1px solid white;
// //         border-radius: 2px;
// //         cursor: se-resize;
// //         display: flex;
// //         align-items: center;
// //         justify-content: center;
// //         font-size: 8px;
// //         color: white;
// //         opacity: 0;
// //         transition: opacity 0.2s ease;
// //         z-index: 10;
// //       `;

// //       dom.appendChild(img);
// //       dom.appendChild(resizeHandle);

// //       // Show resize handle on hover
// //       let isSelected = false;

// //       const updateResizeHandle = () => {
// //         if (isSelected) {
// //           resizeHandle.style.opacity = "1";
// //         } else {
// //           resizeHandle.style.opacity = "0";
// //         }
// //       };

// //       // Handle image selection
// //       const handleClick = (e: Event) => {
// //         e.preventDefault();
// //         e.stopPropagation();

// //         const pos = getPos();
// //         if (pos !== undefined) {
// //           editor.commands.setNodeSelection(pos);
// //           isSelected = true;
// //           updateResizeHandle();
// //         }
// //       };

// //       img.addEventListener("click", handleClick);

// //       // Handle editor selection changes
// //       const updateSelection = () => {
// //         const { selection } = editor.state;
// //         isSelected =
// //           selection.from <= getPos() &&
// //           selection.to >= getPos() + node.nodeSize;
// //         updateResizeHandle();
// //       };

// //       editor.on("selectionUpdate", updateSelection);

// //       // Resize functionality
// //       let isResizing = false;
// //       let startX: number,
// //         startY: number,
// //         startWidth: number,
// //         startHeight: number;

// //       const startResize = (e: MouseEvent) => {
// //         e.preventDefault();
// //         e.stopPropagation();
// //         isResizing = true;
// //         startX = e.clientX;
// //         startY = e.clientY;
// //         startWidth = parseInt(img.style.width) || img.offsetWidth;
// //         startHeight = parseInt(img.style.height) || img.offsetHeight;

// //         document.addEventListener("mousemove", resize);
// //         document.addEventListener("mouseup", stopResize);
// //       };

// //       const resize = (e: MouseEvent) => {
// //         if (!isResizing) return;

// //         const deltaX = e.clientX - startX;
// //         const deltaY = e.clientY - startY;

// //         const newWidth = Math.max(50, startWidth + deltaX);
// //         const newHeight = Math.max(50, startHeight + deltaY);

// //         img.style.width = `${newWidth}px`;
// //         img.style.height = `${newHeight}px`;
// //       };

// //       const stopResize = () => {
// //         if (!isResizing) return;

// //         isResizing = false;
// //         document.removeEventListener("mousemove", resize);
// //         document.removeEventListener("mouseup", stopResize);

// //         // Update the node attributes
// //         const pos = getPos();
// //         if (pos !== undefined) {
// //           editor.commands.command(({ tr }) => {
// //             tr.setNodeMarkup(pos, undefined, {
// //               ...node.attrs,
// //               width: img.style.width,
// //               height: img.style.height,
// //             });
// //             return true;
// //           });
// //         }
// //       };

// //       resizeHandle.addEventListener("mousedown", startResize);

// //       // Cleanup
// //       return {
// //         dom,
// //         destroy: () => {
// //           img.removeEventListener("click", handleClick);
// //           resizeHandle.removeEventListener("mousedown", startResize);
// //           document.removeEventListener("mousemove", resize);
// //           document.removeEventListener("mouseup", stopResize);
// //           editor.off("selectionUpdate", updateSelection);
// //         },
// //       };
// //     };
// //   },
// // });

// import { type Editor, type NodeViewProps } from "@tiptap/core";

// export const ResizableImage = Image.extend({
//   name: "resizableImage",

//   addAttributes() {
//     return {
//       src: {
//         default: null,
//       },
//       alt: {
//         default: null,
//       },
//       title: {
//         default: null,
//       },
//       width: {
//         default: "300px",
//         parseHTML: (element: HTMLElement) =>
//           element.getAttribute("data-width") || element.style.width || "300px",
//         renderHTML: (attributes: ResizableImageAttributes ) => {
//           const { width, height, wrap } = attributes;
//           let style = `width: ${width}; height: ${height || "auto"}; max-width: 100%;`;

//           if (wrap === "inline") {
//             style += " display: inline; vertical-align: middle; margin: 0 4px;";
//           } else if (wrap === "wrap") {
//             style += " float: left; margin: 0 12px 6px 0; clear: both;";
//           } else if (wrap === "break") {
//             style += " display: block; margin: 12px auto; float: none; clear: both;";
//           }

//           return {
//             "data-width": width,
//             "data-height": height,
//             "data-wrap": wrap,
//             class: `resizable-image image-wrap-${wrap}`,
//             style,
//           };
//         },
//       },
//       height: {
//         default: "auto",
//         parseHTML: (element: HTMLElement) =>
//           element.getAttribute("data-height") || element.style.height || "auto",
//         renderHTML: () => ({}), // handled in width
//       },
//       wrap: {
//         default: "inline",
//         parseHTML: (element: HTMLElement) =>
//           element.getAttribute("data-wrap") || "inline",
//         renderHTML: () => ({}),
//       },
//     };
//   },

//   addCommands() {
//     return {
//       setImage:
//         (options: ResizableImageAttributes) =>
//         ({ commands }: CommandProps) =>
//           commands.insertContent({
//             type: this.name,
//             attrs: options,
//           }),
//       updateImage:
//         (options: Partial<ResizableImageAttributes>) =>
//         ({ chain }: CommandProps) =>
//           chain().updateAttributes(this.name, options).run(),
//       setImageSize:
//         (width: string, height: string = "auto") =>
//         ({ chain }: CommandProps) =>
//           chain().updateAttributes(this.name, { width, height }).run(),
//       setImageWrap:
//         (wrap: "inline" | "wrap" | "break") =>
//         ({ chain }: CommandProps) =>
//           chain().updateAttributes(this.name, { wrap }).run(),
//     };
//   },

//   addNodeView() {
//     return ({ node, getPos, editor }: NodeViewProps & { editor: Editor }) => {
//       const dom = document.createElement("span");
//       dom.className = `image-resize-container image-wrap-${node.attrs.wrap}`;
//       dom.setAttribute("data-wrap", node.attrs.wrap);

//       const img = document.createElement("img");
//       img.src = node.attrs.src;
//       img.alt = node.attrs.alt || "";
//       img.title = node.attrs.title || "";
//       img.className = "resizable-image";
//       img.style.width = node.attrs.width;
//       img.style.height = node.attrs.height;
//       img.style.maxWidth = "100%";

//       // Apply wrapping styles
//       switch (node.attrs.wrap) {
//         case "wrap":
//           img.style.float = "left";
//           img.style.marginRight = "12px";
//           img.style.marginBottom = "6px";
//           break;
//         case "break":
//           img.style.display = "block";
//           img.style.margin = "12px auto";
//           img.style.float = "none";
//           break;
//         default:
//           img.style.display = "inline";
//           img.style.verticalAlign = "middle";
//           img.style.margin = "0 4px";
//       }

//       // Resize handle
//       const resizeHandle = document.createElement("div");
//       resizeHandle.className = "resize-handle";
//       resizeHandle.innerHTML = "↘";
//       resizeHandle.style.cssText = `
//         position: absolute;
//         bottom: 2px;
//         right: 2px;
//         width: 12px;
//         height: 12px;
//         background: #3b82f6;
//         border: 1px solid white;
//         border-radius: 2px;
//         cursor: se-resize;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 8px;
//         color: white;
//         opacity: 0;
//         transition: opacity 0.2s ease;
//         z-index: 10;
//       `;

//       dom.appendChild(img);
//       dom.appendChild(resizeHandle);

//       let isSelected = false;

//       const updateResizeHandle = () => {
//         resizeHandle.style.opacity = isSelected ? "1" : "0";
//       };

//       const handleClick = (e: MouseEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         const pos = getPos();
//         if (pos !== undefined) {
//           editor.commands.setNodeSelection(pos);
//           isSelected = true;
//           updateResizeHandle();
//         }
//       };

//       img.addEventListener("click", handleClick);

//       const updateSelection = () => {
//         const { selection } = editor.state;
//         const pos = getPos();
//         if (pos === undefined) return;
//         isSelected = selection.from <= pos && selection.to >= pos + node.nodeSize;
//         updateResizeHandle();
//       };

//       editor.on("selectionUpdate", updateSelection);

//       // Resize logic
//       let isResizing = false;
//       let startX = 0,
//         startY = 0,
//         startWidth = 0,
//         startHeight = 0;

//       const startResize = (e: MouseEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         isResizing = true;
//         startX = e.clientX;
//         startY = e.clientY;
//         startWidth = parseInt(img.style.width) || img.offsetWidth;
//         startHeight = parseInt(img.style.height) || img.offsetHeight;

//         document.addEventListener("mousemove", resize);
//         document.addEventListener("mouseup", stopResize);
//       };

//       const resize = (e: MouseEvent) => {
//         if (!isResizing) return;
//         const deltaX = e.clientX - startX;
//         const deltaY = e.clientY - startY;
//         const newWidth = Math.max(50, startWidth + deltaX);
//         const newHeight = Math.max(50, startHeight + deltaY);
//         img.style.width = `${newWidth}px`;
//         img.style.height = `${newHeight}px`;
//       };

//       const stopResize = () => {
//         if (!isResizing) return;
//         isResizing = false;
//         document.removeEventListener("mousemove", resize);
//         document.removeEventListener("mouseup", stopResize);

//         const pos = getPos();
//         if (pos !== undefined) {
//           editor.commands.command(({ tr }) => {
//             tr.setNodeMarkup(pos, undefined, {
//               ...node.attrs,
//               width: img.style.width,
//               height: img.style.height,
//             });
//             return true;
//           });
//         }
//       };

//       resizeHandle.addEventListener("mousedown", startResize);

//       return {
//         dom,
//         destroy: () => {
//           img.removeEventListener("click", handleClick);
//           resizeHandle.removeEventListener("mousedown", startResize);
//           document.removeEventListener("mousemove", resize);
//           document.removeEventListener("mouseup", stopResize);
//           editor.off("selectionUpdate", updateSelection);
//         },
//       };
//     };
//   },
// });

// // Toolbar Button Component
// const ToolbarButton: React.FC<ToolbarButtonProps> = ({
//   onClick,
//   isActive,
//   children,
//   title,
//   disabled = false,
// }) => (
//   <button
//     onClick={onClick}
//     className={`toolbar-button ${isActive ? "is-active" : ""}`}
//     type="button"
//     title={title}
//     disabled={disabled}
//   >
//     {children}
//   </button>
// );

// const TextEditor: React.FC = () => {
//   const [isClient, setIsClient] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Use your custom usePost hook
//   const { mutateAsync, isPending } = usePost("/public-images", (data) => {
//     console.log("Upload success", data);
//   });

//   const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await mutateAsync(formData);
//       if (res.imageUrl) {
//         editor
//           ?.chain()
//           .focus()
//           .setImage({
//             src: res.imageUrl,
//             alt: file.name,
//             title: file.name,
//             width: 300,
//             height: undefined,
//           })
//           .run();
//       }
//     } catch (err) {
//       console.error("Upload failed", err);
//       alert("Image upload failed. Please try again.");
//     } finally {
//       e.target.value = "";
//     }
//   };

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       TextStyle,
//       Color,
//       TextAlign.configure({
//         types: ["heading", "paragraph", "image"],
//       }),
//       ResizableImage.configure({
//         HTMLAttributes: {
//           class: "resizable-image",
//         },
//         inline: false,
//       }),
//     ],
//     content: `
//       <p>Start editing your content here...</p>
//     `,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       const html = editor.getHTML();
//       console.log("Editor content:", html);
//     },
//   });

//   if (!isClient || !editor) {
//     return <div>Loading editor...</div>;
//   }

//   // Function to set image text wrapping
//   const setImageWrap = (wrap: "inline" | "wrap" | "break") => {
//     editor.chain().focus().setImageWrap(wrap).run();
//   };

//   // Check current image wrap mode
// //   const getCurrentImageWrap = (): "inline" | "wrap" | "break" => {
// //     const node = editor.state.selection.node;
// //     return node?.attrs?.wrap || "inline";
// //   };
// const getCurrentImageWrap = (): "inline" | "wrap" | "break" => {
//   const { selection } = editor.state;

//   if (selection instanceof NodeSelection && selection.node) {
//     const wrap = selection.node.attrs?.wrap;
//     if (wrap === "inline" || wrap === "wrap" || wrap === "break") {
//       return wrap;
//     }
//   }

//   return "inline"; // default
// };
//   const handleSaveContent = () => {
//     const content = editor.getHTML();
//     console.log("Final content:", content);
//     alert("Content saved! Check console for HTML output.");
//   };

//   return (
//     <div className="text-editor-container">
//       <div className="toolbar">
//         <div className="toolbar-group">
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleBold().run()}
//             isActive={editor.isActive("bold")}
//             title="Bold"
//           >
//             <strong>B</strong>
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleItalic().run()}
//             isActive={editor.isActive("italic")}
//             title="Italic"
//           >
//             <em>I</em>
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().toggleUnderline().run()}
//             isActive={editor.isActive("underline")}
//             title="Underline"
//           >
//             <u>U</u>
//           </ToolbarButton>
//         </div>

//         <div className="toolbar-group">
//           <ToolbarButton
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 1 }).run()
//             }
//             isActive={editor.isActive("heading", { level: 1 })}
//             title="Heading 1"
//           >
//             H1
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 2 }).run()
//             }
//             isActive={editor.isActive("heading", { level: 2 })}
//             title="Heading 2"
//           >
//             H2
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 3 }).run()
//             }
//             isActive={editor.isActive("heading", { level: 3 })}
//             title="Heading 3"
//           >
//             H3
//           </ToolbarButton>
//         </div>

//         <div className="toolbar-group">
//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("left").run()}
//             isActive={editor.isActive({ textAlign: "left" })}
//             title="Align Left"
//           >
//             ⬅️
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("center").run()}
//             isActive={editor.isActive({ textAlign: "center" })}
//             title="Align Center"
//           >
//             🔘
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => editor.chain().focus().setTextAlign("right").run()}
//             isActive={editor.isActive({ textAlign: "right" })}
//             title="Align Right"
//           >
//             ➡️
//           </ToolbarButton>
//         </div>

//         <div className="toolbar-group">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             ref={fileInputRef}
//             style={{ display: "none" }}
//           />
//           <ToolbarButton
//             onClick={() => fileInputRef.current?.click()}
//             isActive={false}
//             disabled={isPending}
//             title="Insert Image"
//           >
//             {isPending ? "📤" : "🖼️"}
//           </ToolbarButton>
//         </div>

//         {/* Image Text Wrapping Controls */}
//         <div className="toolbar-group">
//           <span>Text Wrap:</span>
//           <ToolbarButton
//             onClick={() => setImageWrap("inline")}
//             isActive={getCurrentImageWrap() === "inline"}
//             title="Inline - Image behaves like text"
//           >
//             Inline
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => setImageWrap("wrap")}
//             isActive={getCurrentImageWrap() === "wrap"}
//             title="Wrap - Text wraps around image"
//           >
//             Wrap
//           </ToolbarButton>
//           <ToolbarButton
//             onClick={() => setImageWrap("break")}
//             isActive={getCurrentImageWrap() === "break"}
//             title="Break - Image breaks text flow"
//           >
//             Break
//           </ToolbarButton>
//         </div>
//       </div>

//       <div className="editor-content">
//         <EditorContent editor={editor} />
//       </div>

//       {/* Content Preview */}
//       <div className="content-preview">
//         <h3>Rendered Output Preview (with inline CSS):</h3>
//         <div
//           className="preview-content"
//           dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
//         />
//         <h3>HTML Output Preview:</h3>
//         <pre>{editor.getHTML()}</pre>
//         <button onClick={handleSaveContent} className="save-button">
//           Save Content
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TextEditor;
