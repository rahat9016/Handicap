import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePreview = () => {
  return useMutation({
    mutationFn: async (filePath: string) => {
      const res = await axios.get(filePath, { responseType: "blob" });
      return res.data as Blob;
    },
  });
};

