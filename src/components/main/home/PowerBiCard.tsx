"use client";
import { IPowerBi } from "@/components/dashboard/powerBi/types/interface";

interface PowerBiCardProps {
  report: IPowerBi;
  length: number;
  index: number;
}

export function PowerBiCard({ report,length,index }: PowerBiCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-300 p-4 ${length%2 !==0 && index ===(length-1) ? 'col-span-2':'col-span-1'}`}>
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
        <div className=" p-3 bg-gray-50 rounded-lg">
          <p className="text-center text-gray-700 text-xl font-semibold">{report?.title}</p>
          <p className="text-center text-gray-700 text-sm">{report?.description}</p>
        </div>
      )}
    </div>
  );
}
