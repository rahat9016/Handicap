"use client";

import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
interface EditorWrapperProps {
  value: string;
  onChange: (content: string) => void;
}

export default function EditorWrapper({ value, onChange }: EditorWrapperProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
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
    ],
    editorProps: {
      handleKeyDown(view, event) {
        // Make Enter insert <br />
        if (event.key === "Enter" && !event.shiftKey) {
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

  if (!editor) {
    return null;
  }

  return (
    <div className="border-2 rounded-md p-3 bg-white focus-within:border-blue-500 transition-colors ">
      <div className="mb-2 flex gap-3 px-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`w-10 h-10 rounded-sm  bg-slate-100 ${editor.isActive("bold") ? "font-bold text-blue-600 bg-slate-200" : ""}`}
          aria-label="Toggle Bold"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`w-12 h-10 rounded-sm   ${editor.isActive("bulletList") ? "font-bold text-blue-600 bg-slate-200" : ""}`}
          aria-label="Toggle Bullet List"
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`w-12 h-10 rounded-sm   ${editor.isActive("orderedList") ? "font-bold text-blue-600 bg-slate-200" : ""}`}
          aria-label="Toggle Ordered List"
        >
          1. List
        </button>
      </div>

      <div
        className="ProseMirror border-2 rounded-md p-3 bg-white focus-within:border-blue-500 transition-colors"
        style={{ minHeight: "200px", maxHeight: "300px", overflowY: "auto" }}
      >
        <EditorContent height={"100%"} editor={editor} />
      </div>
    </div>
  );
}
