"use client";
import { cn } from "@/lib/utils";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { TextSelection } from "prosemirror-state";
import { FontSizeExtension } from "./FontSizeExtension";

interface EditorWrapperProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

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

      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "bg-yellow/20 px-1 rounded",
        },
      }),

      Bold,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      HardBreak.configure({
        HTMLAttributes: {
          class: "break",
        },
      }),
      Blockquote,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      FontSizeExtension,
    ],
    editorProps: {
      handleKeyDown(view, event) {
        if (event.key === "Enter" && event.shiftKey) {
          editor?.commands.setHardBreak();
          return true;
        }
        return false;
      },
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[200px]",
      },
    },
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
    // editable:false
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const fontSize = parseInt(
                editor.getAttributes("textStyle").fontSize || "16",
                10
              );
              const newSize = Math.max(8, fontSize - 2);
              editor.chain().focus().setFontSize(`${newSize}`).run();
            }}
            className="w-10 h-10 rounded-sm bg-slate-100"
          >
            A-
          </button>
          <button
            type="button"
            onClick={() => {
              const fontSize = parseInt(
                editor.getAttributes("textStyle").fontSize || "16",
                10
              );
              const newSize = Math.min(72, fontSize + 2);
              editor.chain().focus().setFontSize(`${newSize}`).run(); // 👈 convert to string
            }}
            className="w-10 h-10 rounded-sm bg-slate-100"
          >
            A+
          </button>
        </div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "w-12 h-12 rounded-sm border border-gray hover:bg-gray/10",
            editor.isActive("underline") &&
              "font-bold text-blue bg-slate-200 border-blue"
          )}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={cn(
            "w-12 h-12 rounded-sm border border-gray/30 hover:bg-gray/10",
            editor.isActive("highlight") &&
              "font-bold text-blue bg-slate-200 border-blue/30"
          )}
        >
          <div className="w-6 h-6 bg-yellow/20 rounded-sm mx-auto"></div>
        </button>
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
      </div>
      <div className="ProseMirror  read-only border-2 rounded-md p-3 bg-white focus-within:border-blue-500 transition-colors">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
