"use client";
import { useGet } from "@/hooks/useGet";
import TotalCard from "./TotalCard";

export default function AdminTotalCardSection() {
  const { data: dashboardData } = useGet("/dashboard", ["dashboard"]);
  const lastData = (dashboardData?.data ?? {
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
    {
      icon: "/images/dashboard/icon18.svg",
      shape: "/images/dashboard/cardShape2.svg",
      title: "Total Organization",
      count: lastData?.totalOrganization,
    },
    {
      icon: "/images/dashboard/icon21.svg",
      shape: "/images/dashboard/cardShape1.svg",
      title: "Total User",
      count: lastData?.totalUsers,
    },
    {
      icon: "/images/dashboard/icon19.svg",
      shape: "/images/dashboard/cardShape4.svg",
      title: "Total Recourses",
      count: lastData?.totalCourse,
    },
    {
      icon: "/images/dashboard/icon24.svg",
      shape: "/images/dashboard/cardShape3.svg",
      title: "Total Training",
      count: lastData?.totalResources,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {data.map((item, index) => (
          <TotalCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
