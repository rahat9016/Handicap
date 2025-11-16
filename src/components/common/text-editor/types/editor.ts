export interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}
export interface ImageAttributes {
  src: string;
  width?: string;
  height?: string;
  alt?: string;
  title?: string;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
}

export interface ImageUploadResponse {
  url: string;
  width?: number;
  height?: number;
}

export type ResizableImageAttributes = ImageAttributes & {
  width?: string;
  height?: string;
  wrap?: "inline" | "wrap" | "break";
  align?: string
};
