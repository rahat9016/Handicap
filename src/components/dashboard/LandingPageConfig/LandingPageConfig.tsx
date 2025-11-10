"use client";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import EditLandingPageConfig from "./EditLandingPageConfig";
import LandingPageSkeleton from "./LandingPageSkeleton";
import { ILandingPageStats, IStatField } from "./types/interface";

export default function LandingPageConfig() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGet<ILandingPageStats>(
    "/landing-page-config",
    ["landing-page-config"]
  );

  const stats = data?.data;

  const startItems = useCallback((): [string, IStatField][] => {
    if (!stats) return [];

    return (Object.keys(stats) as (keyof typeof stats)[])
      .filter((key) => key.startsWith("field"))
      .map((key) => [key, stats[key]])
      .filter(
        (pair): pair is [string, IStatField] =>
          !!pair[1] && typeof pair[1] === "object"
      );
  }, [stats]);

  if (isLoading) {
    return <LandingPageSkeleton/>;
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 ">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Landing page Information
        </h2>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          <Pencil className="w-4 h-4" /> Edit
        </Button>
      </div>
      {startItems().map(([key, field], idx) => (
        <div key={key} className="border p-4 rounded-lg bg-gray-50 space-y-3">
          <h3 className="font-semibold text-black mb-2">
            {field.title?.en || `Field ${idx + 1}`}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500 font-medium">Title (English)</p>
              <p className="text-black border rounded-md px-3 py-2 bg-white mt-2">
                {field.title?.en || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 font-medium">Title (Bangla)</p>
              <p className="text-gray-800 border rounded-md px-3 py-2 bg-white  mt-2">
                {field.title?.bn || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 font-medium">Value (English)</p>
              <p className="text-gray-800 border rounded-md px-3 py-2 bg-white mt-2">
                {field.value?.en || "—"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 font-medium">Value (Bangla)</p>
              <p className="text-gray-800 border rounded-md px-3 py-2 bg-white mt-2">
                {field.value?.bn || "—"}
              </p>
            </div>
          </div>
        </div>
      ))}

      <EditLandingPageConfig
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialValues={stats}
      />
    </div>
  );
}
