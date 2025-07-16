import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
const chartData = [
  { month: "Jan", visitors: 3920 },
  { month: "Feb", visitors: 100000 },
  { month: "Mar", visitors: 60000 },
  { month: "Apr", visitors: 20000 },
  { month: "May", visitors: 30000 },
  { month: "Jun", visitors: 50000 },
  { month: "Jul", visitors: 150000 },
  { month: "Aug", visitors: 180000 },
  { month: "Sep", visitors: 60000 },
  { month: "Oct", visitors: 80000 },
  { month: "Nov", visitors: 130000 },
  { month: "Dec", visitors: 180000 },
];
const countryData = [
  { name: "Bangladesh", value: 40 },
  { name: "Malaysia", value: 25 },
  { name: "Other", value: 20 },
  { name: "China", value: 15 },
];

const trainingData = [
  {
    img: "/images/dashboard/img.png",
    title: "Digital Literacy for Beginners",
    organizer: "Organization Name 01",
    enrolled: 10423,
    completed: 1823,
  },
  {
    img: "/images/dashboard/img.png",
    title: "Digital Literacy for Beginners",
    organizer: "Organization Name 01",
    enrolled: 10423,
    completed: 1823,
  },
  {
    img: "/images/dashboard/img.png",
    title: "Digital Literacy for Beginners",
    organizer: "Organization Name 01",
    enrolled: 10423,
    completed: 1823,
  },
  {
    img: "/images/dashboard/img.png",
    title: "Digital Literacy for Beginners",
    organizer: "Organization Name 01",
    enrolled: 10423,
    completed: 1823,
  },
];
const COLORS = ["#135393", "#83B9EF", "#27AE60", "#F2994A"];
export default function AdminChart() {
  const [organization, setOrganization] = useState("all");
  const [timeRange, setTimeRange] = useState("24h");
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 py-0 border border-skeleton">
          <CardContent className="p-8">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-erieBlack font-inter">
                Total Visitor
              </h2>
              <div className="flex gap-2">
                <Select value={organization} onValueChange={setOrganization}>
                  <SelectTrigger className="w-40 text-darkLiver font-inter text-sm border border-skeleton">
                    <SelectValue placeholder="All Organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organization</SelectItem>
                    <SelectItem value="org01">Organization 01</SelectItem>
                    <SelectItem value="org02">Organization 02</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40 text-darkLiver font-inter text-sm border border-skeleton">
                    <SelectValue placeholder="Last 24 Hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="12h">Last 12 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
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
            </div>
          </CardContent>
        </Card>
        <Card className="py-0 px-0 border border-skeleton">
          <CardContent className="px-0 flex flex-col gap-2">
            <div className="border-b p-8 border-skeleton">
              <h2 className="font-semibold text-lg text-erieBlack font-inter">
                Quick Action
              </h2>
            </div>
            <div className="py-4 flex flex-col gap-2 px-[28px]">
              <Button className="group bg-white hover:bg-dashboard-primary flex items-center justify-start gap-2 w-full h-[58px] border border-skeleton hover:text-white text-darkLiver font-inter font-medium text-base">
                <Image
                  width={24}
                  height={24}
                  src="/images/dashboard/icon01.svg"
                  alt="Add New Members"
                  className="group-hover:white-filter"
                />{" "}
                Add New Members
              </Button>
              <Button className="group bg-white hover:bg-dashboard-primary flex items-center justify-start gap-2 w-full h-[58px] border border-skeleton hover:text-white text-darkLiver font-inter font-medium text-base">
                <Image
                  width={24}
                  height={24}
                  src="/images/dashboard/icon02.svg"
                  alt="Add New Members"
                  className="group-hover:white-filter"
                />{" "}
                Add Organization
              </Button>
              <Button className="group bg-white hover:bg-dashboard-primary flex items-center justify-start gap-2 w-full h-[58px] border border-skeleton hover:text-white text-darkLiver font-inter font-medium text-base">
                <Image
                  width={24}
                  height={24}
                  src="/images/dashboard/icon04.svg"
                  alt="Add New Members"
                  className="group-hover:white-filter"
                />{" "}
                Create Training Module
              </Button>
              <Button className="group bg-white hover:bg-dashboard-primary flex items-center justify-start gap-2 w-full h-[58px] border border-skeleton hover:text-white text-darkLiver font-inter font-medium text-base">
                <Image
                  width={24}
                  height={24}
                  src="/images/dashboard/icon23.svg"
                  alt="Add New Members"
                  className="group-hover:white-filter"
                />{" "}
                Upload Resources
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="py-0 px-0 border border-skeleton">
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
              {[
                {
                  title: "Resource 1",
                  description: "Description for resource 1",
                  downloads: 120,
                  views: 500,
                },
                {
                  title: "Resource 2",
                  description: "Description for resource 2",
                  downloads: 90,
                  views: 400,
                },
                {
                  title: "Resource 3",
                  description: "Description for resource 3",
                  downloads: 70,
                  views: 300,
                },
                {
                  title: "Resource 4",
                  description: "Description for resource 4",
                  downloads: 50,
                  views: 200,
                },
              ].map((resource, index) => (
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
                    <div className="font-semibold">{resource.title}</div>
                    <div className="text-sm text-muted-foreground">
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
                      <span>{resource.downloads}</span>
                    </div>
                    <div className="text-xs text-erieBlack font-medium  font-inter flex flex-row items-center gap-1">
                      <Image
                        width={24}
                        height={24}
                        src="/images/dashboard/icon06.svg"
                        alt="icon06"
                      />
                      <span>{resource.views}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="py-0 px-0 border border-skeleton">
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
                  {trainingData.map((training, index) => (
                    <div key={index} className="border-b h-[66px] flex items-center px-6">
                      <div className="p-2 flex items-center gap-2 mt-1 flex-1">
                        <Image
                          width={44}
                          height={44}
                          src={training.img}
                          alt="trannig"
                          className="w-11 h-11 rounded object-cover"
                        />
                        <div>
                          <div className="text-xs text-erieBlack font-inter font-medium">{training.title}</div>
                          <div className="text-xs text-[#8C8C8C] font-inter font-normal">
                            {training.organizer}
                          </div>
                        </div>
                      </div>
                      <div className="p-2 w-20 text-erieBlack font-inter text-xs font-medium">
                        {training.enrolled.toLocaleString()}
                      </div>
                      <div className="p-2 w-20 text-erieBlack font-inter text-xs font-medium">
                        {training.completed.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-0 px-0 border border-skeleton">
          <CardContent className="px-0 flex flex-col gap-2">
            <div className="border-b p-8 border-skeleton">
              <h2 className="font-semibold text-lg text-erieBlack font-inter">
                Top Visitor Country
              </h2>
            </div>
            <div className="px-8 py-2 border-skeleton">
              <h2 className="font-medium text-base text-darkLiver font-inter flex items-center gap-2">
                Total Visitor  <span className="text-dashboard-primary font-bold text-2xl">24,985</span>
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
