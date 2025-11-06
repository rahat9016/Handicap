"use client";
import { IResource } from "@/components/dashboard/resources/types/types";
import { INews } from "@/components/news/types/news";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGet } from "@/hooks/useGet";
import { Link } from "@/i18n/navigation";
import { FileSearch } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import QuickAccessCard from "./QuickAccessCard";
import QuickAccessSkeleton from "./QuickAccessSkeleton";

const QuickAccess = () => {
  const local = useLocale() as "en" | "bn";
  const { data, isLoading } = useGet<IResource[]>(
    "/resources/?isApproved=true&featured=true",
    ["resources"],
    {
      page: String(1),
      limit: String(3),
    }
  );
  const { data: suggestedData, isLoading: isSuggestedLoading } = useGet<
    IResource[]
  >("/resources/?isSuggested=true", ["suggestedData"], {
    page: String(1),
    limit: String(3),
  });
  const { data: newsData, isLoading: isNewsLoading } = useGet<INews[]>(
    "/news",
    ["news"],
    {
      page: String(1),
      limit: String(3),
    }
  );
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState("featured1");
  const t = useTranslations("Home");

  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/home/bg.png')` }}
    >
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle title={t("quickAccess")} />

          <div className="w-full" tabIndex={0} onFocus={() => setActive(true)}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* ----- Tab Buttons ----- */}
              <div className="w-6/12 mx-auto mt-14">
                <TabsList className="w-full gap-2 lg:gap-5 flex flex-col lg:flex-row">
                  <TabsTrigger
                    className=" w-[220px] group bg-[#DBE4FF] py-2 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex gap-3"
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
                    {t("recommended")}
                  </TabsTrigger>
                  <TabsTrigger
                    className=" w-[220px] group bg-[#DBE4FF] py-2 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex gap-3"
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
                    {t("featuredResources")}
                  </TabsTrigger>

                  <TabsTrigger
                    className=" w-[220px] group bg-[#DBE4FF] py-2 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex gap-3"
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
                    {t("news")}
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* ----- Tab Contents ----- */}
              <div className="mt-10">
                {/* Featured 1 */}
                <TabsContent value="featured1">
                  {isLoading ? (
                    <QuickAccessSkeleton />
                  ) : data?.data && data.data.length > 0 ? (
                    <div>
                      <div className="md:grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center w-full">
                        {data?.data?.map((item) => (
                          <QuickAccessCard
                            key={item.id}
                            date={item.createdAt}
                            title={
                              item?.title?.[local] ?? item?.title?.en ?? ""
                            }
                            desc={
                              item?.description?.[local] ??
                              item?.description?.en ??
                              ""
                            }
                            pathname={`/resources/${item.id}`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href="/resources"
                          className="mt-3 bg-transparent hover:bg-transparent underline text-black"
                        >
                          More Resources
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-center ">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue/10 text-blue">
                        <FileSearch className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-semibold text-black mb-2 mt-2">
                        No Data Found
                      </h3>
                      <p className="text-sm text-black/50 max-w-md">
                        It looks like there are no data available right now.
                        Please check back later or try refreshing the page.
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="featured2">
                  {isSuggestedLoading ? (
                    <QuickAccessSkeleton />
                  ) : suggestedData?.data && suggestedData.data.length > 0 ? (
                    <div>
                      <div className="md:grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center w-full">
                        {suggestedData?.data?.map((item) => (
                          <QuickAccessCard
                            key={item.id}
                            date={item.createdAt}
                            title={
                              item?.title?.[local] ?? item?.title?.en ?? ""
                            }
                            desc={
                              item?.description?.[local] ??
                              item?.description?.en ??
                              ""
                            }
                            pathname={`/resources/${item.id}`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <Link
                          href="/resources"
                          className="mt-3 bg-transparent hover:bg-transparent underline text-black"
                        >
                          More Suggested Resources
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-center ">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue/10 text-blue">
                        <FileSearch className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-semibold text-black mb-2 mt-2">
                        No Data Found
                      </h3>
                      <p className="text-sm text-black/50 max-w-md">
                        It looks like there are no data available right now.
                        Please check back later or try refreshing the page.
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Announcements */}
                <TabsContent value="announcements">
                  {isNewsLoading ? (
                    <QuickAccessSkeleton />
                  ) : newsData?.data && newsData.data.length > 0 ? (
                    <div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
                      {newsData?.data?.map((item) => (
                        <QuickAccessCard
                          key={item.id}
                          date={item.createdAt}
                          title={item?.title}
                          desc={item?.summary}
                          pathname={`/news/${item.id}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-end">
                        <Link
                          href="/news"
                          className="mt-3 bg-transparent hover:bg-transparent underline text-black"
                        >
                          More News
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-center ">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue/10 text-blue">
                        <FileSearch className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-semibold text-black mb-2 mt-2">
                        No Data Found
                      </h3>
                      <p className="text-sm text-black max-w-md">
                        It looks like there are no data available right now.
                        Please check back later or try refreshing the page.
                      </p>
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
};

export default QuickAccess;
