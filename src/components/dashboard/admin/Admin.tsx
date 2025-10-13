"use client";

import { useGet } from "@/hooks/useGet";
import { useAppSelector } from "@/lib/redux/hooks";
import AdminChart from "./AdminChart";
import AdminTotalCardSection from "./AdminTotalCardSection";
import { IDashboardData } from "./types/interface";
import AnalyticsCardSection from "./AnalyticsCardSection";

export default function Admin() {
  const { organizationId } = useAppSelector((state) => state.organizer);

  const endpoint = organizationId
    ? `/dashboard/organization/${organizationId}`
    : "/dashboard";

  const { data: dashboardData } = useGet<IDashboardData>(
    endpoint,
    ["dashboard", organizationId ?? "all"],
    {},
    { enabled: organizationId !== undefined }
  );

  return (
    <div className="flex flex-col gap-6">
      <AdminTotalCardSection dashboardData={dashboardData?.data} />
      {!organizationId && <AnalyticsCardSection />}
      <AdminChart dashboardData={dashboardData?.data} />
    </div>
  );
}
