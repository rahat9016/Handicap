import { getBaseUrl } from "@/config/envConfig";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

function getFileExtension(filePath?: string) {
  if (!filePath) return "";
  const match = filePath.match(/\.([a-zA-Z0-9]+)(\?|#|$)/);
  return match ? `.${match[1]}` : "";
}

function ensureExtension(filename: string, ext: string) {
  if (!ext) return filename;
  if (filename.toLowerCase().endsWith(ext.toLowerCase())) return filename;
  return filename + ext;
}

export function useDownloadResource(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);

  const download = async (
    id: number,
    filename: string,
    filePath?: string,
    resourcesId?: number | string
  ) => {
    const fileId = Number(id);
    setLoading(true);
    try {
      const res = await fetch(
        `${getBaseUrl()}/resources/download/${resourcesId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resourceFileIds: [fileId],
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch file");

      const disposition = res.headers.get("content-disposition");
      let suggestedName = filename;

      // Extract filename from content-disposition
      if (disposition && disposition.includes("filename=")) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          suggestedName = match[1];
        }
      } else {
        // If no filename from server, ensure extension from filePath
        const ext = getFileExtension(filePath);
        suggestedName = ensureExtension(filename, ext);
      }

      // Download logic
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = suggestedName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // ✅ trigger refetch if provided
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Download error:", err);
      toast.error("PDF download failed");
      // alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return { download, loading };
}
