"use client";
import { IPowerBi } from "@/components/dashboard/powerBi/types/interface";

interface PowerBiCardProps {
  report: IPowerBi;
}

export function PowerBiCard({ report }: PowerBiCardProps) {

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 col-span-1">
      <div className="border rounded-lg overflow-hidden">
        <iframe
          src={report?.link}
          className="w-full h-[600px]"
          frameBorder="0"
          allowFullScreen
          title={report?.title}
        />
      </div>

      {/* Description */}
      {report?.description && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-gray-700 text-sm">{report?.description}</p>
        </div>
      )}
    </div>
  );
}
