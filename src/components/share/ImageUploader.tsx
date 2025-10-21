// ImageUploader.tsx
"use client";

import { usePost } from "@/hooks/usePost";
import { Editor } from "@tiptap/react";
import { ChangeEvent } from "react";

export default function ImageUploader({ editor }: { editor: Editor }) {
  const { mutateAsync } = usePost("/public-images", (data) => {
    console.log("Upload success", data);
  });
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await mutateAsync(formData).then((res) => {
        if (res.imageUrl) {
          console.log("resource");
          editor
            .chain()
            .focus()
            .setImage({
              src: res.imageUrl,
              alt: file.name,
              title: file.name,
            })
            .run();
        }
      });
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <label className="cursor-pointer w-12 h-12 rounded-sm bg-slate-100 flex items-center justify-center">
      🖼️
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}
