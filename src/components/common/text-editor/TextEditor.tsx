/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePost } from "@/hooks/usePost";

import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState
} from "react";
import "./TextEditor.css";

import Highlight from "@tiptap/extension-highlight";
import {
  CiCircleList,
  CiTextAlignCenter,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";
import { HiOutlineNumberedList } from "react-icons/hi2";
import HeadingButtons from "./HeadingButtons";
import ToolbarButton from "./Toolbar";
import CustomBlockquote from "./extensions/blockquote";
import FontSize from "./extensions/font-size";
import ResizableImage from "./extensions/resizable-image";
import useForceUpdate from "./hooks/useForceUpdate";
import { TextEditorProps } from "./types/editor";
import getCurrentImageWrap from "./utils/getCurrentImageWrap";
import { Color } from "@tiptap/extension-text-style";

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const [isClient, setIsClient] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState<string>("");
  const forceUpdate = useForceUpdate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64];

  const { mutateAsync, isPending } = usePost<{
    imageUrl: string
  }>("/public-images", (data) => {
    console.log("Upload success", data);
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await mutateAsync(formData);
      console.log("response --------->", res)
      if (res.imageUrl) {
        editor
          ?.chain()
          .focus()
          .setImage({
            src: res.imageUrl,
            alt: file.name,
            title: file.name,
            width: "300px",
            height: "auto",
          })
          .run();
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Image upload failed. Please try again.");
    } finally {
      if (e.target) e.target.value = "";
    }
  };

  const getCurrentFontSize = (): string => {
    if (!editor) return "";
    const fontSize = editor.getAttributes("textStyle").fontSize;
    return fontSize ? fontSize.replace("px", "") : "";
  };

  const updateFontSizeState = () => {
    setCurrentFontSize(getCurrentFontSize());
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      CustomBlockquote,
      Underline,
      TextStyle,
      Color,
      FontSize,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      ResizableImage.configure({
        HTMLAttributes: {
          class: "resizable-image",
        },
        inline: false,
      }),
    ],
    content: value||`
      <p>Write here your dynamic content...</p>
    `,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      updateFontSizeState();
      forceUpdate();
    },
    onSelectionUpdate: () => {
      updateFontSizeState();
      forceUpdate();
    },
    onTransaction: ({ transaction }) => {
      if (transaction.docChanged || transaction.selectionSet) {
        updateFontSizeState();
        forceUpdate();
      }
    },
  });

  useEffect(() => {
    if (editor) {
      updateFontSizeState();
    }
  }, [editor]);

  if (!isClient || !editor) {
    return <div>Loading editor...</div>;
  }

  const setImageWrap = (wrap: "inline" | "wrap" | "break") => {
    editor.chain().focus().setImageWrap(wrap).run();
  };

  // Function to set font size
  const setFontSize = (fontSize: string) => {
    if (fontSize === "") {
      editor.chain().focus().unsetFontSize().run();
      setCurrentFontSize("");
    } else {
      editor.chain().focus().setFontSize(`${fontSize}px`).run();
      setCurrentFontSize(fontSize);
    }
  };

  const setHighlight = (color: string = "#fffb0080") => {
    if (color === "remove") {
      editor.chain().focus().unsetHighlight().run();
    } else {
      editor.chain().focus().setHighlight({ color }).run();
    }
  };

  // Function to wrap selected text with quotation marks
  const wrapWithQuotationMarks = () => {
    const { from, to } = editor.state.selection;

    if (from === to) {
      // No text selected, just insert quotation marks at cursor
      editor.chain().focus().insertContent("❝ ❞").run();
    } else {
      // Get selected text
      const selectedText = editor.state.doc.textBetween(from, to);

      // Wrap the selected text with quotation marks
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .insertContent(`❝${selectedText}❞`)
        .run();
    }
  };



  const applyHeadingToSelection = (level: 1 | 2 | 3) => {
    if (!editor) return;

    const { from, to } = editor.state.selection;

    if (from === to) {
      editor.chain().focus().toggleHeading({ level }).run();
    } else {
      const selectedText = editor.state.doc.textBetween(from, to);

      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .insertContent({
          type: "heading",
          attrs: { level },
          content: [{ type: "text", text: selectedText }],
        })
        .run();
    }
  };

  return (
    <div className="text-editor-container">
      <div className="toolbar">
        {/* Font Size Dropdown */}
        <div className="toolbar-group">
          <span>Font Size:</span>
          <select
            value={currentFontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="font-size-select"
            title="Font Size"
          >
            <option value="">Default</option>
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>

        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <u>U</u>
          </ToolbarButton>
        </div>

        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Block Quote"
          >
            📄
          </ToolbarButton>
          <ToolbarButton
            onClick={wrapWithQuotationMarks}
            isActive={false}
            title="Wrap with Quotation Marks"
          >
            ❝ ❞
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setHighlight("#fffb0080")}
            isActive={editor.isActive("highlight")}
            title="Highlight Text"
          >
            🖍️
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setHighlight("remove")}
            isActive={false}
            title="Remove Highlight"
          >
            🗑️
          </ToolbarButton>
        </div>
        <div className="toolbar-group">
          <HeadingButtons editor={editor} applyHeadingToSelection={applyHeadingToSelection} />
        </div>
        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <CiTextAlignLeft />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <CiTextAlignCenter />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <CiTextAlignRight />
          </ToolbarButton>
        </div>
        <div className="toolbar-group">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <CiCircleList />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <HiOutlineNumberedList />
          </ToolbarButton>
        </div>
        <div className="toolbar-group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            isActive={false}
            disabled={isPending}
            title="Insert Image"
          >
            {isPending ? "📤" : "🖼️"}
          </ToolbarButton>
        </div>

        <div className="toolbar-group">
          <span>Text Wrap:</span>
          <ToolbarButton
            onClick={() => setImageWrap("inline")}
            isActive={getCurrentImageWrap(editor) === "inline"}
            title="Inline - Image behaves like text"
          >
            Inline
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setImageWrap("wrap")}
            isActive={getCurrentImageWrap(editor) === "wrap"}
            title="Wrap - Text wraps around image"
          >
            Wrap
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setImageWrap("break")}
            isActive={getCurrentImageWrap(editor) === "break"}
            title="Break - Image breaks text flow"
          >
            Break
          </ToolbarButton>
        </div>

        <div className="toolbar-group">
          <span>Highlight:</span>
          <button
            onClick={() => setHighlight("#fffb0080")}
            className="color-swatch"
            style={{ backgroundColor: "#fffb0080" }}
            title="Yellow Highlight"
          />
          <button
            onClick={() => setHighlight("#ff000080")}
            className="color-swatch"
            style={{ backgroundColor: "#ff000080" }}
            title="Red Highlight"
          />
          <button
            onClick={() => setHighlight("#00ff0080")}
            className="color-swatch"
            style={{ backgroundColor: "#00ff0080" }}
            title="Green Highlight"
          />
          <button
            onClick={() => setHighlight("#0000ff80")}
            className="color-swatch"
            style={{ backgroundColor: "#0000ff80" }}
            title="Blue Highlight"
          />
        </div>
      </div>
<div className="editor-content">
        <EditorContent editor={editor} />
      </div>
      {/* <div className="editor-content">
        <EditorContent editor={editor} />
      </div>

      <div className="content-preview">
        <h3>Rendered Output Preview (with inline CSS):</h3>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
        <h3>HTML Output Preview:</h3>
        <pre>{editor.getHTML()}</pre>
      </div> */}
    </div>
  );
};

export default TextEditor;
