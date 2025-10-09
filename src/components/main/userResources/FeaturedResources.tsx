"use client";
import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { Download, Eye } from "lucide-react";
import Image from "next/image";
import { IFeaturedResource } from "./types/interface";

const colorClasses: Record<string, string> = {
  green: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]",
};

const FeaturedResources = () => {
  const { data } = useGet<IFeaturedResource[]>("/resources/client-featured", [
    "FeatureResources",
  ]);
  const resources = data?.data || [];
  console.log(resources);
  return (
    <div className="bg-[#8c8ccb10]">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20 2xl:py-40">
        <SectionTopTitle
          title="Featured Resources"
          desc="Explore a curated selection of high-impact tools, guides, and publications designed to advance disability inclusion in humanitarian action."
        />

        <div className="mt-8 lg:mt-10 xl:mt-12 px-0 sm:px-4 lg:px-8 xl:px-16 2xl:px-[58px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 lg:mt-12 xl:mt-16 2xl:mt-20">
            {resources?.map((res, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#2A53CD] group hover:bg-[#353535] p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl transition-all duration-300 hover:shadow-xl"
              >
                {/* Resource Type Badge */}
                <p
                  className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full border border-green text-green`}
                >
                  Featured
                </p>

                {/* Title */}
                <Title className="text-base sm:text-lg lg:text-xl group-hover:text-white mt-4 sm:mt-6 leading-tight">
                  {res.title}
                </Title>

                {/* Rating Section */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Image
                        key={star}
                        width={16}
                        height={16}
                        src="/images/resources/star.svg"
                        alt="star"
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                      />
                    ))}
                  </div>
                  <Paragraph className="text-[#666666] text-xs sm:text-sm">
                    4.8/5.00
                  </Paragraph>
                </div>

                {/* File Info Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-2 sm:mt-3 gap-1 sm:gap-4 lg:gap-8">
                  <Paragraph className="text-[#666666] group-hover:text-white text-xs sm:text-sm">
                    PDF Document
                  </Paragraph>
                  <Paragraph className="text-[#666666] group-hover:text-white text-xs sm:text-sm">
                    245 Downloads
                  </Paragraph>
                </div>

                {/* Description */}
                <Paragraph className="text-[#666666] group-hover:text-white mb-0 mt-4 sm:mt-6 text-sm leading-relaxed">
                  {res.description}
                </Paragraph>

                {/* Action Buttons */}
                <div className="flex justify-end mt-4 sm:mt-6">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      className="w-1/2 sm:w-auto h-8 sm:h-10 bg-transparent hover:bg-transparent text-[#666666] group-hover:text-white border border-gray-300 group-hover:border-gray-500 text-xs sm:text-sm"
                      variant="outline"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="hidden sm:inline">Preview</span>
                    </Button>
                    <Button className="w-1/2 sm:w-auto h-8 sm:h-10 bg-[#00A896] hover:bg-[#057266] text-white text-xs sm:text-sm">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="hidden sm:inline">Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedResources;
