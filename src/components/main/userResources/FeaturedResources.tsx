"use client";
import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import { useGet } from "@/hooks/useGet";
import { Building2, Eye, FileSearch } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IFeaturedResource } from "./types/interface";

const FeaturedResources = () => {
  const local = useLocale() as "en" | "bn";
  const pathname = usePathname();
  const { data } = useGet<IFeaturedResource[]>("/resources/client-featured", [
    "FeatureResources",
  ]);
  const resources = data?.data || [];

  const t = useTranslations("ResourceLibrary");
  return (
    <div className="bg-[#8c8ccb10]">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20 2xl:py-40">
        <SectionTopTitle
          title={t("featuredResources")}
          desc={t("featuredResourcesDesc")}
        />
        ;
        <div className="mt-8 lg:mt-10 xl:mt-12 px-0 sm:px-4 lg:px-8 xl:px-16 2xl:px-[58px]">
          {resources && resources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 lg:mt-12 xl:mt-16 2xl:mt-20">
              {resources.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#2A53CD] group hover:bg-[#353535] p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex gap-2">
                    <p className="w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full border bg-blue text-white">
                      Medium: {res.language.name}
                    </p>
                  </div>

                  {/* Title */}
                  <Title className="text-base sm:text-lg lg:text-xl group-hover:text-white mt-4 sm:mt-6 leading-tight">
                    {local === "en" ? res.title : res.titleBn}
                  </Title>

                  {/* File Info Section */}
                  <div className="flex gap-2 items-center font-medium mt-5 group-hover:text-white">
                    <Building2 />
                    <p>{res.organization.name}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 sm:mt-3 gap-1 sm:gap-4 lg:gap-8">
                    <Paragraph className="text-[#666666] group-hover:text-white text-xs sm:text-sm">
                      {res.totalViewCount} Views
                    </Paragraph>
                    <Paragraph className="text-[#666666] group-hover:text-white text-xs sm:text-sm">
                      {res.totalDownloadCount} Downloads
                    </Paragraph>
                  </div>

                  {/* Description */}
                  <Paragraph className="text-[#666666] group-hover:text-white mb-0 mt-4 sm:mt-6 text-sm leading-relaxed">
                    {local === "en" ? res.description : res.descriptionBn}
                  </Paragraph>

                  {/* Action Buttons */}
                  <Link
                    href={`${pathname}/${res.id}`}
                    className="cursor-pointer text-sm font-medium hover:bg-white w-full border flex gap-2 items-center justify-center mt-5 rounded-lg py-2 bg-muted"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <p>View</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue/10 text-blue mb-0">
                <FileSearch className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                No Resources Found
              </h3>
              <p className="text-sm text-black/50 max-w-md">
                It looks like there are no training materials available right
                now. Please check back later or try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedResources;
