"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import TotalCard from "./TotalCard";
import { IDashboardData, ITotalCard } from "./types/interface";

export default function AdminTotalCardSection({
  dashboardData,
}: {
  dashboardData: IDashboardData | undefined;
}) {
  const { hasPermission } = useAppSelector((state) => state.permission);

  const lastData = (dashboardData ?? {
    totalCourse: 0,
    totalOrganization: 0,
    totalUsers: 0,
    totalResources: 0,
  }) as {
    totalCourse: number;
    totalOrganization: number;
    totalUsers: number;
    totalResources: number;
  };

  const data = [
    hasPermission && {
      icon: "/images/dashboard/icon18.svg",
      shape: "/images/dashboard/cardShape2.svg",
      title: "Total Organization",
      count: lastData?.totalOrganization,
    },
    hasPermission && {
      icon: "/images/dashboard/icon21.svg",
      shape: "/images/dashboard/cardShape1.svg",
      title: "Total User",
      count: lastData?.totalUsers,
    },
    {
      icon: "/images/dashboard/icon19.svg",
      shape: "/images/dashboard/cardShape4.svg",
      title: "Total Recourses",
      count: lastData?.totalResources,
    },
    {
      icon: "/images/dashboard/icon24.svg",
      shape: "/images/dashboard/cardShape3.svg",
      title: "Total Training",
      count: lastData?.totalCourse,
    },
  ].filter(Boolean) as ITotalCard[];

  return (
    <div>
      <div
        className={`grid ${
          data.length === 2
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        } gap-6`}
      >
        {data.map((item, index) => (
          <TotalCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
