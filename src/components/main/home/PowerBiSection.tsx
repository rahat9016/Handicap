"use client";
import { IPowerBi } from "@/components/dashboard/powerBi/types/interface";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useGet } from "@/hooks/useGet";
import { useTranslations } from "next-intl";
import { PowerBiCard } from "./PowerBiCard";

export default function PowerBiSection() {
  const { data } = useGet<IPowerBi[]>("/powerbi?isActive=true", ["powerbi"], {
    page: String(1),
    limit: String(10),
  });

  const t = useTranslations("Home");

  // console.log("data", data?.data);
  return (
    <div className="bg-light">

    <div className="container mx-auto py-10">
      <SectionTopTitle title={t("powerBi")} desc={t("powerBiDesc")} />
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
    </div>
    </div>
  );
}
