"use client";
import { cn } from "@/lib/utils";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextSelection } from "prosemirror-state";
import ImageUploader from "./ImageUploader";
interface EditorWrapperProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

// export default function EditorWrapper({
//   value,
//   onChange,
//   className,
// }: EditorWrapperProps) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: false,
//         orderedList: false,
//         listItem: false,
//         blockquote: {},
//         hardBreak: false,
//       }),
//       Bold,
//       BulletList,
//       OrderedList,
//       ListItem,
//       HardBreak.configure({
//         HTMLAttributes: {
//           class: "break",
//         },
//       }),
//       Blockquote,
//       Image.configure({
//         inline: true,
//         allowBase64: true,
//         HTMLAttributes: {
//           class: "rounded-md max-w-full my-2",
//           style: "height: auto;",
//         },
//       }),
//       TextStyle,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//     ],
//     editorProps: {
//       handleKeyDown(view, event) {
//         if (event.key === "Enter" && event.shiftKey) {
//           editor?.commands.setHardBreak();
//           return true;
//         }
//         return false;
//       },
//     },
//     content: value,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//     immediatelyRender: false,
//   });

//   if (!editor) {
//     return null;
//   }
//   const increaseFontSize = () => {
//     const currentFontSize = editor.getAttributes("textStyle").style?.fontSize;
//     const size = currentFontSize ? parseInt(currentFontSize) : 16;
//     editor
//       .chain()
//       .focus()
//       .setMark("textStyle", { style: `font-size: ${size + 2}px` })
//       .run();
//   };

//   const decreaseFontSize = () => {
//     const currentFontSize = editor.getAttributes("textStyle").style?.fontSize;
//     const size = currentFontSize ? parseInt(currentFontSize) : 16;
//     editor
//       .chain()
//       .focus()
//       .setMark("textStyle", { style: `font-size: ${Math.max(size - 2, 8)}px` })
//       .run();
//   };
//   return (
//     <div
//       className={cn(
//         "border-2 rounded-md p-3 bg-white focus-within:border-blue-500 transition-colors ",
//         className
//       )}
//     >
//       <div className="mb-2 flex gap-3 px-3">
//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={`w-12 h-12 rounded-sm  ${
//             editor.isActive("bold")
//               ? "font-bold text-blue-600 bg-slate-200"
//               : ""
//           }`}
//           aria-label="Toggle Bold"
//         >
//           B
//         </button>
//         <div>
//           <button
//             type="button"
//             onClick={decreaseFontSize}
//             className="w-12 h-12 rounded-sm bg-slate-100"
//           >
//             A-
//           </button>
//           <button
//             type="button"
//             onClick={increaseFontSize}
//             className="w-12 h-12 rounded-sm bg-slate-100"
//           >
//             A+
//           </button>
//         </div>
//         <div className="flex gap-2">
//           <button
//             type="button"
//             onClick={() => editor.chain().focus().setTextAlign("left").run()}
//             className={`w-12 h-12 rounded-sm text-sm font-inter font-normal ${
//               editor.isActive("textAlign", { align: "left" })
//                 ? "font-bold text-blue bg-slate-200"
//                 : ""
//             }`}
//           >
//             Left
//           </button>

//           <button
//             type="button"
//             onClick={() => editor.chain().focus().setTextAlign("center").run()}
//             className={`w-12 h-12 rounded-sm text-sm font-inter font-normal ${
//               editor.isActive("textAlign", { align: "center" })
//                 ? "font-bold text-blue bg-slate-200"
//                 : ""
//             }`}
//           >
//             Center
//           </button>

//           <button
//             type="button"
//             onClick={() => editor.chain().focus().setTextAlign("right").run()}
//             className={`w-12 h-12 rounded-sm text-sm font-inter font-normal ${
//               editor.isActive("textAlign", { align: "right" })
//                 ? "font-bold text-blue bg-slate-200"
//                 : ""
//             }`}
//           >
//             Right
//           </button>

//           <button
//             type="button"
//             onClick={() => editor.chain().focus().setTextAlign("justify").run()}
//             className={`w-12 h-12 rounded-sm text-sm font-inter font-normal ${
//               editor.isActive("textAlign", { align: "justify" })
//                 ? "font-bold text-blue bg-slate-200"
//                 : ""
//             }`}
//           >
//             Justify
//           </button>
//         </div>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           className={`w-12 h-12 rounded-sm  text-sm font-inter font-normal ${
//             editor.isActive("bulletList")
//               ? "font-bold text-blue-600 bg-slate-200"
//               : ""
//           }`}
//           aria-label="Toggle Bullet List"
//         >
//           • List
//         </button>

//         <button
//           type="button"
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           className={`w-12 h-12 rounded-sm  text-sm font-inter font-normal ${
//             editor.isActive("orderedList")
//               ? "font-bold text-blue-600 bg-slate-200"
//               : ""
//           }`}
//           aria-label="Toggle Ordered List"
//         >
//           1. List
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             if (!editor) return;

//             const { state, view } = editor;
//             const { from, to } = state.selection;
//             const selectedText = state.doc.textBetween(from, to, " ");

//             if (selectedText) {
//               editor
//                 .chain()
//                 .focus()
//                 .insertContentAt({ from, to }, `❝${selectedText}❞`)
//                 .run();
//               (editor as any).commands.setQuotation();
//             } else {
//               editor.chain().focus().insertContent(`❝ ❞`).run();
//               (editor as any).commands.setQuotation();

//               const newPos = view.state.selection.from - 1;
//               const transaction = view.state.tr.setSelection(
//                 TextSelection.near(view.state.doc.resolve(newPos))
//               );
//               view.dispatch(transaction);
//               view.focus();
//             }
//           }}
//           className="w-12 h-12 rounded-sm text-lg flex items-center justify-center bg-slate-100"
//           aria-label="Insert Styled Quotation"
//         >
//           ❝❞
//         </button>

//         <label className="cursor-pointer w-12 h-12 rounded-sm bg-slate-100 flex items-center justify-center">
//           🖼️
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={async (e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;

//               const formData = new FormData();
//               formData.append("file", file);

//               try {
//                 const res = await fetch("http://0.0.0.0:8000/upload", {
//                   method: "POST",
//                   body: formData,
//                 });
//                 const data = await res.json();

//                 const imageUrl = data.url;
//                 editor
//                   ?.chain()
//                   .focus()
//                   .setImage({
//                     src: imageUrl,
//                     alt: file.name,
//                     title: file.name,
//                   })
//                   .run();
//               } catch (err) {
//                 console.error("Upload failed", err);
//               }
//             }}
//           />
//         </label>
//       </div>

//       <div
//         className="ProseMirror border-2 rounded-md p-3 bg-white focus-within:border-blue-500 transition-colors"
//         style={{ minHeight: "200px", maxHeight: "300px", overflowY: "auto" }}
//       >
//         <EditorContent height={"100%"} editor={editor} />
//       </div>
//     </div>
//   );
// }
export default function EditorWrapper({
  value,
  onChange,
  className,
}: EditorWrapperProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: {},
        hardBreak: false,
      }),
      Bold,
      BulletList,
      OrderedList,
      ListItem,
      HardBreak.configure({
        HTMLAttributes: {
          class: "break",
        },
      }),
      Blockquote,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-md max-w-full my-2",
          style: "height: auto; width: auto;",
        },
      }),
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Enter" && event.shiftKey) {
          editor?.commands.setHardBreak();
          return true;
        }
        return false;
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        "border-2 rounded-md p-3 bg-white focus-within:border-blue-500 transition-colors",
        className
      )}
    >
      <div className="mb-2 flex flex-wrap gap-2 px-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "w-12 h-12 rounded-sm",
            editor.isActive("bold") && "font-bold text-blue-600 bg-slate-200"
          )}
        >
          B
        </button>

        {/* Text Alignment */}
        {["left", "center", "right", "justify"].map((align) => (
          <button
            key={align}
            type="button"
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            className={cn(
              "w-12 h-12 rounded-sm",
              editor.isActive("textAlign", { align }) &&
                "font-bold text-blue bg-slate-200"
            )}
          >
            {align[0].toUpperCase()}
          </button>
        ))}

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "w-12 h-12 rounded-sm",
            editor.isActive("bulletList") &&
              "font-bold text-blue-600 bg-slate-200"
          )}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "w-12 h-12 rounded-sm",
            editor.isActive("orderedList") &&
              "font-bold text-blue-600 bg-slate-200"
          )}
        >
          1. List
        </button>

        {/* Quotation */}
        <button
          type="button"
          onClick={() => {
            if (!editor) return;
            const { state, view } = editor;
            const { from, to } = state.selection;
            const selectedText = state.doc.textBetween(from, to, " ");
            if (selectedText) {
              editor
                .chain()
                .focus()
                .insertContentAt({ from, to }, `❝${selectedText}❞`)
                .run();
            } else {
              editor.chain().focus().insertContent(`❝ ❞`).run();
              const newPos = view.state.selection.from - 1;
              const transaction = view.state.tr.setSelection(
                TextSelection.near(view.state.doc.resolve(newPos))
              );
              view.dispatch(transaction);
              view.focus();
            }
          }}
          className="w-12 h-12 rounded-sm text-lg flex items-center justify-center bg-slate-100"
        >
          ❝❞
        </button>

        {/* Image */}
        <ImageUploader editor={editor} />
      </div>
      <div className="ProseMirror border-2 rounded-md p-3 bg-white focus-within:border-blue-500 transition-colors">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
