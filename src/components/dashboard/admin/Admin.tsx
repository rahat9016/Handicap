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
  const { organizationId, isInitialized } = useAppSelector(
    (state) => state.organizer
  );
  const { hasPermission } = useAppSelector((state) => state.permission);
  console.log("organizationId:", organizationId);
  console.log("Type of organizationId:", typeof organizationId);
  const endpoint = isInitialized
    ? organizationId
      ? `/dashboard/organization/${organizationId}`
      : "/dashboard"
    : null;
  console.log("endpoint:", endpoint);
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useGet<IDashboardData>(
      endpoint || "",
      ["dashboard", organizationId || "all"],
      {},
      {
        enabled: isInitialized && endpoint !== null,
        staleTime: 30000,
        retry: 1,
      }
    );

  const { data: analyticsData, isLoading: isAnalyticsLoading } =
    useGet<IAnalyticsSummary>(
      "/analytics/summary",
      ["analytics-summary"],
      {},
      { enabled: isInitialized && hasPermission }
    );

  if (!isInitialized) {
    return (
      <div className="flex flex-col gap-6">
        <AdminTotalCardSectionSkeleton />
        <AdminTotalCardSectionSkeleton />
      </div>
    );
  }
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
