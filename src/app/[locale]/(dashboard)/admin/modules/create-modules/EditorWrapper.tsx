"use client"

import Bold from "@tiptap/extension-bold"
import BulletList from "@tiptap/extension-bullet-list"
import ListItem from "@tiptap/extension-list-item"
import OrderedList from "@tiptap/extension-ordered-list"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface EditorWrapperProps {
  value: string
  onChange: (content: string) => void
}

export default function EditorWrapper({ value, onChange }: EditorWrapperProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      BulletList,
      OrderedList,
      ListItem,  // add this explicitly
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border-2 rounded-md p-3 bg-white focus-within:border-blue-500 transition-colors ">
      <div className="mb-2 flex gap-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "font-bold text-blue-600" : ""}
          aria-label="Toggle Bold"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "text-blue-600" : ""}
          aria-label="Toggle Bullet List"
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "text-blue-600" : ""}
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
  )
}
