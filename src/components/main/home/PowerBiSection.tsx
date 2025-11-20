"use client";
import { IPowerBi } from "@/components/dashboard/powerBi/types/interface";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useGet } from "@/hooks/useGet";
import { useTranslations } from "next-intl";
import { CgDanger } from "react-icons/cg";
import { PowerBiCard } from "./PowerBiCard";

export default function PowerBiSection() {
  const { data } = useGet<IPowerBi[]>("/powerbi?isActive=true", ["powerbi"], {
    page: String(1),
    limit: String(10),
  });
  const t = useTranslations("Home");
  return (
    <div className="bg-light">
      <div className="container mx-auto py-10">
        <SectionTopTitle title={t("powerBi")} desc={t("powerBiDesc")} />
        {data?.data && data?.data?.length > 0 ? (
          <div className={`grid grid-cols-2 gap-4 mt-8`}>
            {data?.data?.map((powerBi: IPowerBi, index) => (
              <PowerBiCard
                key={index + 1}
                report={powerBi}
                length={data?.data?.length}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue/10 text-blue mb-3">
              <CgDanger className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">
              No Power BI Reports Found
            </h3>
            <p className="text-sm text-black/50 max-w-md">
              It looks like there are no Power BI reports available right now.
              Please check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
