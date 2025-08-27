import { getBaseUrl } from "@/config/envConfig";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resourceFileIds: [fileId],
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch file");
      if (res.ok && filePath) {
        const resp = await fetch(filePath);
        if (!res.ok) throw new Error("Failed to fetch file");

        const blob = await resp.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(blobUrl);
      }
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
