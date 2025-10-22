"use client";

import { IStakeholder } from "@/components/dashboard/stakeholders/types/stakeholders";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useGet";
import { usePreview } from "@/hooks/usePreview";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EssentialFeatures() {
  const { data, isLoading } = useGet<IStakeholder[]>(
    "/stakeholders?isActive=true",
    ["Stakeholders"],
    {}
  );

  const { mutateAsync: previewFile } = usePreview();
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const t = useTranslations("Training");

  const colorClasses: Record<string, string> = {
    green: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]",
    blue: "bg-[#4F46E514] text-[#BBB7FF] border border-[#4F46E566]",
    yellow: "bg-[#EAB30814] text-[#65A30D] border border-[#65A30D66]",
    cyan: "bg-[#06B6D414] text-[#06B6D4] border border-[#06B6D466]",
    pink: "bg-[#EC489914] text-[#EC4899] border border-[#EC489966]",
  };
  console.log(pdfBlobUrl);

  const getColorByIndex = (index: number) => {
    const colors = Object.keys(colorClasses);
    return colors[index % colors.length];
  };

  const handlePreview = async (filePath: string) => {
    try {
      const blob = await previewFile(filePath);
      const url = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      setPdfBlobUrl(url);
      setOpen(true);
    } catch (err) {
      console.error("PDF preview failed:", err);
      toast.error("PDF preview failed");
    }
  };

  return (
    <div className="container">
      <div className="py-10 lg:py-20 lg:pt-[120px]">
        <SectionTopTitle
          title={t("essentialFeatures")}
          desc={t("essentialFeaturesInfo")}
        />

        <div className="w-full lg:w-9/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 lg:mt-20">
            {isLoading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F3F3F4] border border-[#AFC4FF] p-8 rounded-2xl"
                  >
                    <Skeleton className="h-5 w-32 rounded-full mb-6" />
                    <Skeleton className="h-6 w-40 mb-4" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ))
              : data?.data?.map((item, idx) => {
                  const colorKey = getColorByIndex(idx);
                  return (
                    <div
                      key={item.id}
                      className="bg-[#F3F3F4] border border-[#AFC4FF] group hover:bg-primary p-8 rounded-2xl transition-colors"
                    >
                      <p
                        className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full ${colorClasses[colorKey]}`}
                      >
                        Stakeholder {String(idx + 1).padStart(2, "0")}
                      </p>

                      <h3 className="text-lg font-semibold text-primary group-hover:text-white mt-6 line-clamp-1">
                        {item.name}
                      </h3>

                      <p className="text-sm font-normal text-[#666666] group-hover:text-white mb-0 mt-3 line-clamp-3">
                        {item.description}
                      </p>

                      <Button
                        className="mt-4 group-hover:bg-white group-hover:text-black"
                        onClick={() => handlePreview(item.link)}
                      >
                        View PDF
                      </Button>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl h-[90vh] p-0 overflow-hidden">
          {pdfBlobUrl ? (
            <iframe
              src={pdfBlobUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Loading PDF...
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
