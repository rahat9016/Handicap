import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { useAppSelector } from "@/lib/redux/hooks";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IDashboardData } from "./types/interface";
type VisitorsResponse = {
  data?: {
    data?: Array<{ month: string; visitors: number }>;
  };
};

const countryData = [
  { name: "Bangladesh", value: 40 },
  { name: "Malaysia", value: 25 },
  { name: "Other", value: 20 },
  { name: "China", value: 15 },
];

const COLORS = ["#135393", "#83B9EF", "#27AE60", "#F2994A"];
export default function AdminChart({
  dashboardData,
}: {
  dashboardData: IDashboardData | undefined;
}) {
  const router = useRouter();
  const { adminOrganizationPermission, hasPermission } = useAppSelector(
    (state) => state.permission
  );
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(String(currentYear));

  const { data, isLoading } = useGet<VisitorsResponse>(
    `/analytics/visitors/yearly?year=${selectedYear}`,
    ["dashboard", selectedYear],
    {}
  );
  const chartData = Array.isArray(data?.data?.data) ? data.data.data : [];
  console.log(chartData);
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {hasPermission && (
          <Card className="col-span-3 lg:col-span-2  py-0 border border-skeleton">
            <CardContent className="p-8">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg text-erieBlack font-inter">
                  Total Visitor
                </h2>
                <div className="flex gap-2">
                  <Select
                    value={selectedYear}
                    onValueChange={(value) => setSelectedYear(value)}
                  >
                    <SelectTrigger className="w-32 text-darkLiver font-inter text-sm border border-skeleton">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(
                        (year) => (
                          <SelectItem key={year} value={String(year)}>
                            {year}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 h-80">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full text-gray-500">
                    Loading...
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData ?? []}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorVisitors"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#3A6FF833" />
                          <stop offset="100%" stopColor="#3A6FF800" />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#8C8C8C" />
                      <YAxis stroke="#8C8C8C" />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="visitors"
                        stroke="#3F93E6"
                        fillOpacity={1}
                        fill="url(#colorVisitors)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="col-span-3 lg:col-span-2 xl:col-span-1 py-0 px-0 border border-skeleton">
          <CardContent className="px-0 flex flex-col gap-2">
            <div className="border-b p-8 border-skeleton">
              <h2 className="font-semibold text-lg text-erieBlack font-inter">
                Quick Action
              </h2>
            </div>
            <div className="py-4 flex flex-col gap-2 px-[28px]">
              {hasPermission && (
                <Button className="group bg-white hover:bg-dashboard-primary flex items-center justify-start gap-2 w-full h-[58px] border border-skeleton hover:text-white text-darkLiver font-inter font-medium text-base">
                  <Image
                    width={24}
                    height={24}
                    src="/images/dashboard/icon02.svg"
                    alt="Add Organization"
                    className="group-hover:white-filter"
                  />{" "}
                  Add Organization
                </Button>
              )}
              {adminOrganizationPermission && (
                <Button
                  onClick={() => router.push("/admin/course/course-create")}
                  className="group bg-white hover:bg-dashboard-primary flex items-center justify-start gap-2 w-full h-[58px] border border-skeleton hover:text-white text-darkLiver font-inter font-medium text-base"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/images/dashboard/icon04.svg"
                    alt="Add New Members"
                    className="group-hover:white-filter"
                  />{" "}
                  Create Course Module
                </Button>
              )}
              {adminOrganizationPermission && (
                <Button
                  onClick={() => router.push("/admin/resources/resources-list")}
                  className="group bg-white hover:bg-dashboard-primary flex items-center justify-start gap-2 w-full h-[58px] border border-skeleton hover:text-white text-darkLiver font-inter font-medium text-base"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/images/dashboard/icon23.svg"
                    alt="Add New Members"
                    className="group-hover:white-filter"
                  />{" "}
                  Upload Resources
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 lg:col-span-2 xl:col-span-1 py-0 px-0 border border-skeleton">
          <CardContent className="px-0 flex flex-col gap-2">
            <div className="border-b p-8 border-skeleton flex items-center justify-between">
              <h2 className="font-semibold text-lg text-erieBlack font-inter">
                Top Resources
              </h2>
              <Button className="bg-transparent hover:bg-dashboard-primary hover:text-white border border-gray font-inter text-xs text-[#8C8C8C] font-medium ">
                View All <ChevronRight />
              </Button>
            </div>
            <ul className="py-4 flex flex-col gap-2 px-[28px]">
              {dashboardData?.topResources?.map((resource, index) => {
                return (
                  <li
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#EDF5FD]" : ""
                    } px-4 h-[72px] rounded flex gap-2 items-center `}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10  rounded-full flex items-center justify-center ${
                        index % 2 !== 0 ? "bg-[#EAF6FB]" : "bg-white"
                      }`}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={
                          index % 2 !== 0
                            ? "/images/dashboard/icon11.svg"
                            : "/images/dashboard/icon12.svg"
                        }
                        alt="icon"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold line-clamp-1">
                        {resource.title}
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {resource.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="text-xs text-erieBlack font-medium font-inter flex flex-row items-center gap-1">
                        <Image
                          width={24}
                          height={24}
                          src="/images/dashboard/icon05.svg"
                          alt="icon05"
                        />
                        <span>{resource.totalDownloadCount}</span>
                      </div>
                      <div className="text-xs text-erieBlack font-medium  font-inter flex flex-row items-center gap-1">
                        <Image
                          width={24}
                          height={24}
                          src="/images/dashboard/icon06.svg"
                          alt="icon06"
                        />
                        <span>{resource.totalViewCount}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
        <Card className="col-span-3 lg:col-span-2 xl:col-span-1 py-0 px-0 border border-skeleton">
          <CardContent className="px-0 flex flex-col gap-2">
            <div className="p-8 pb-[28px] flex items-center justify-between">
              <h2 className="font-semibold text-lg text-erieBlack font-inter">
                Top Training
              </h2>
              <Button className="bg-transparent hover:bg-dashboard-primary hover:text-white border border-gray font-inter text-xs text-[#8C8C8C] font-medium ">
                View All <ChevronRight />
              </Button>
            </div>
            <div className="">
              <div className="text-xs font-inter ">
                <div className="flex border-b text-[#8C8C8C] px-6">
                  <div className="text-left p-2 flex-1">Title</div>
                  <div className="text-left p-2 w-20 ">Enrolled</div>
                  <div className="text-left p-2 w-20">Completed</div>
                </div>
                <div>
                  {dashboardData?.topCourses.map((training, index) => (
                    <div
                      key={index}
                      className="border-b h-[66px] flex items-center px-6"
                    >
                      <div className="p-2 flex items-center gap-2 mt-1 flex-1">
                        <Image
                          width={44}
                          height={44}
                          src={training?.thumbnailUrl}
                          alt="trannig"
                          className="w-11 h-11 rounded object-cover"
                        />
                        <div>
                          <div className="text-xs text-erieBlack font-inter font-medium">
                            {training.title}
                          </div>
                          <div className="text-xs text-[#8C8C8C] font-inter font-normal">
                            {training.organization.name}
                          </div>
                        </div>
                      </div>
                      <div className="p-2 w-20 text-erieBlack font-inter text-xs font-medium">
                        {/* {.toLocaleString()} */}0
                      </div>
                      <div className="p-2 w-20 text-erieBlack font-inter text-xs font-medium">
                        {/* {training.completed.toLocaleString()} */}0
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hidden col-span-3 lg:col-span-2 xl:col-span-1 py-0 px-0 border border-skeleton">
          <CardContent className="px-0 flex flex-col gap-2">
            <div className="border-b p-8 border-skeleton">
              <h2 className="font-semibold text-lg text-erieBlack font-inter">
                Top Visitor Country
              </h2>
            </div>
            <div className="px-8 py-2 border-skeleton">
              <h2 className="font-medium text-base text-darkLiver font-inter flex items-center gap-2">
                Total Visitor{" "}
                <span className="text-dashboard-primary font-bold text-2xl">
                  24,985
                </span>
              </h2>
            </div>
            <div className="py-4 flex items-center flex-row gap-2 px-[28px]">
              <div className="w-1/2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={countryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {countryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2">
                <ul className="">
                  {countryData.map((country, index) => (
                    <li
                      key={index}
                      className="h-[30px] flex justify-between items-center text-darkLiver font-inter font-medium text-base"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></span>
                        {country.name}
                      </span>
                      <span className="text-black font-semibold text-sm">
                        {country.value}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
