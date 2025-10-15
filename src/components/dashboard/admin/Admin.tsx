"use client";

import { useGet } from "@/hooks/useGet";
import { useAppSelector } from "@/lib/redux/hooks";
import AdminChart from "./AdminChart";
import AdminTotalCardSection from "./AdminTotalCardSection";
import { AdminTotalCardSectionSkeleton } from "./AdminTotalCardSectionSkeleton";
import AnalyticsCardSection from "./AnalyticsCardSection";
import { PopularPages } from "./PopularPages";
import { IAnalyticsSummary, IDashboardData } from "./types/interface";

export default function Admin() {
  const { organizationId } = useAppSelector((state) => state.organizer);
  const { hasPermission } = useAppSelector((state) => state.permission);
  const endpoint = organizationId
    ? `/dashboard/organization/${organizationId}`
    : "/dashboard";

  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGet<IDashboardData>(
      endpoint,
      ["dashboard", organizationId ?? "all"],
      {},
      { enabled: organizationId !== undefined }
    );
  const { data: analyticsData, isLoading: isAnalyticsLoading } =
    useGet<IAnalyticsSummary>("/analytics/summary", ["analytics-summary"]);
  return (
    <div className="flex flex-col gap-6">
      {isDashboardLoading ? (
        <AdminTotalCardSectionSkeleton />
      ) : (
        <AdminTotalCardSection dashboardData={dashboardData?.data} />
      )}

      {isAnalyticsLoading ? (
        <AdminTotalCardSectionSkeleton />
      ) : (
        hasPermission && (
          <AnalyticsCardSection analyticsData={analyticsData?.data} />
        )
      )}
      <AdminChart dashboardData={dashboardData?.data} />
      <PopularPages popularPages={analyticsData?.data.popularPages} />
    </div>
  );
}
