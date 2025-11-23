// ImageUploader.tsx
"use client";

import { usePost } from "@/hooks/usePost";
import { Editor } from "@tiptap/react";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";

export default function ImageUploader({ editor }: { editor: Editor }) {
  const { mutateAsync, isPending } = usePost("/public-images", (data) => {
    console.log("Upload success", data);
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await mutateAsync(formData);
      if (res.imageUrl) {
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
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Image upload failed. Please try again.");
    }
  };

  return (
    <label className="relative cursor-pointer w-12 h-12 rounded-sm bg-slate-100 flex items-center justify-center">
      {isPending ? (
        <div className="w-6 h-6 border-4 border-blue border-t-transparent rounded-full animate-spin"></div>
      ) : (
        "🖼️"
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
}
