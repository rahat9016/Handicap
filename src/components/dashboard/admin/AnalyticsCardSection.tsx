import React from "react";
import { AnalyticsSummary } from "./types/interface";
import { useGet } from "@/hooks/useGet";
import { OverviewCards } from "./OverviewCards";
import { PopularPages } from "./PopularPages";

export default function AnalyticsCardSection() {
  const { data: analyticsData } = useGet<AnalyticsSummary>(
    "/analytics/summary",
    ["analytics-summary"]
  );
  return (
    <>
      <OverviewCards data={analyticsData?.data.overview} />
      <PopularPages popularPages={analyticsData?.data.popularPages} />
    </>
  );
}
