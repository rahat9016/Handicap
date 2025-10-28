"use client";
import { IPowerBi } from "@/components/dashboard/powerBi/types/interface";
import { useGet } from "@/hooks/useGet";
import React from "react";
import { PowerBiCard } from "./PowerBiCard";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useTranslations } from "next-intl";

export default function PowerBiSection() {
  const { data } = useGet<IPowerBi[]>("/powerbi?isActive=true", ["powerbi"], {
    page: String(1),
    limit: String(10),
  });

  const t = useTranslations("Home");

  console.log("data", data?.data);
  return (
    <div className="container mx-auto p-6">
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
  );
}
