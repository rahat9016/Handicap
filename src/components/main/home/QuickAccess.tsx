"use client";
import { IResource } from "@/components/dashboard/resources/types/types";
import { INews } from "@/components/news/types/news";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGet } from "@/hooks/useGet";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { ICourse } from "../training/types/traning";
import QuickAccessCard from "./QuickAccessCard";
import QuickAccessSkeleton from "./QuickAccessSkeleton";

export default function QuickAccess() {
  const local = useLocale() as "en" | "bn";
  const { data, isLoading } = useGet<IResource[]>("/resources", ["resources"], {
    page: String(1),
    limit: String(3),
  });
  const { data: courseData, isLoading: isCourseLoading } = useGet<ICourse[]>(
    "/course/published",
    ["course"],
    {
      page: String(1),
      limit: String(3),
    }
  );
  const { data: newsData, isLoading: isNewsLoading } = useGet<INews[]>(
    "/news",
    ["news"],
    {
      page: String(1),
      limit: String(3),
    }
  );
  // const resources = {
  //   featured1: [
  //     {
  //       date: "Apr 2023",
  //       title: "Disability Inclusion in WASH",
  //       desc: "Guidelines for inclusive WASH facilities in humanitarian settings",
  //       downloads: 78,
  //     },
  //     {
  //       date: "Jun 2023",
  //       title: "Inclusive Education in Emergencies",
  //       desc: "Best practices for ensuring education access for children with disabilities",
  //       downloads: 64,
  //     },
  //     {
  //       date: "Feb 2024",
  //       title: "Accessible Shelter Guidelines",
  //       desc: "Technical specifications for accessible shelter design",
  //       downloads: 52,
  //     },
  //   ],
  //   featured2: [
  //     {
  //       date: "Jan 2024",
  //       title: "Assistive Tech Tools",
  //       desc: "Tools and software for accessibility improvements",
  //       downloads: 35,
  //     },
  //   ],
  //   announcements: [
  //     {
  //       date: "Mar 2024",
  //       title: "New Training Program Launched",
  //       desc: "Vocational training for persons with disabilities now open",
  //       downloads: 0,
  //     },
  //   ],
  // };

  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState("featured1");

  return (
    <div className="relative w-full bg-white">
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle title="Quick Access" />
          <div
            className="w-full lg:w-9/12 mx-auto"
            tabIndex={0}
            onFocus={() => setActive(true)}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* ----- Tab Buttons ----- */}
              <div className="w-6/12 mx-auto">
                <TabsList className="mx-auto flex-col lg:flex-row w-fit bg-transparent rounded-lg mb-6 gap-5">
                  <TabsTrigger
                    className="group bg-[#DBE4FF] px-8 py-3 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex items-center gap-3"
                    value="featured1"
                    tabIndex={active ? 1 : 0}
                  >
                    <Image
                      className="transition group-data-[state=active]:white-filter"
                      width={20}
                      height={20}
                      src={"/images/home/icon__1.svg"}
                      alt="icon_1.svg"
                    />
                    Featured Resources
                  </TabsTrigger>

                  <TabsTrigger
                    className="group bg-[#DBE4FF] px-8 py-3 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex items-center gap-3"
                    value="featured2"
                    tabIndex={active ? 3 : 0}
                  >
                    <Image
                      className="transition group-data-[state=active]:white-filter"
                      width={20}
                      height={20}
                      src={"/images/home/icon__2.svg"}
                      alt="icon_2.svg"
                    />
                    Training
                  </TabsTrigger>

                  <TabsTrigger
                    className="group bg-[#DBE4FF] px-8 py-3 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex items-center gap-3"
                    value="announcements"
                    tabIndex={active ? 5 : 0}
                  >
                    <Image
                      className="transition group-data-[state=active]:white-filter"
                      width={20}
                      height={20}
                      src={"/images/home/icon__3.svg"}
                      alt="icon_3.svg"
                    />
                    Announcements
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* ----- Tab Contents ----- */}
              <div className="mt-20 lg:mt-10">
                {/* Featured 1 */}
                <TabsContent value="featured1">
                  {isLoading ? (
                    <QuickAccessSkeleton />
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
                      {data?.data?.map((item) => (
                        <QuickAccessCard
                          key={item.id}
                          date={item.createdAt}
                          title={item?.title?.[local] ?? item?.title?.en}
                          desc={
                            item?.description?.[local] ?? item?.description?.en
                          }
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="featured2">
                  {isCourseLoading ? (
                    <QuickAccessSkeleton />
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
                      {courseData?.data?.map((item) => (
                        <QuickAccessCard
                          key={item.id}
                          date={item.createdAt}
                          title={item?.title}
                          desc={item?.description}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Announcements */}
                <TabsContent value="announcements">
                  {isNewsLoading ? (
                    <QuickAccessSkeleton />
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
                      {newsData?.data?.map((item) => (
                        <QuickAccessCard
                          key={item.id}
                          date={item.createdAt}
                          title={item?.title}
                          desc={item?.summary}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
