import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import Image from "next/image";

const resources = [
  {
    title: "Disability Inclusion in WASH Programs",
    type: "Featured",
    typeColor: "green",
    description:
      "Comprehensive guidelines for making WASH facilities accessible for persons with disabilities in humanitarian settings.",
  },
  {
    title: "Disability Inclusion in WASH Programs",
    type: "Featured",
    typeColor: "green",
    description:
      "Comprehensive guidelines for making WASH facilities accessible for persons with disabilities in humanitarian settings.",
  },
  {
    title: "Disability Inclusion in WASH Programs",
    type: "Featured",
    typeColor: "green",
    description:
      "Comprehensive guidelines for making WASH facilities accessible for persons with disabilities in humanitarian settings.",
  },
];
const colorClasses: Record<string, string> = {
  green: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]",
};

export default function FeaturedResources() {
  return (
    <div className="bg-[#8c8ccb10]">
      <div className="container py-10 lg:py-20 xl:py-40">
        <SectionTopTitle
          title="Featured Resources"
          desc="Explore a curated selection of high-impact tools, guides, and publications designed to advance disability inclusion in humanitarian action."
        />
        <div className="mt-10 px-[58px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 lg:mt-20">
            {resources.map((res, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#2A53CD] group hover:bg-[#353535] p-8 rounded-2xl"
              >
                <p
                  className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full ${
                    colorClasses[res.typeColor]
                  }`}
                >
                  {res.type}
                </p>
                <Title className="lg:text-lg group-hover:text-white mt-6">
                  {res.title}
                </Title>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center">
                    <Image
                      width={20}
                      height={20}
                      src="/images/resources/star.svg"
                      alt="star"
                    />
                    <Image
                      width={20}
                      height={20}
                      src="/images/resources/star.svg"
                      alt="star"
                    />
                    <Image
                      width={20}
                      height={20}
                      src="/images/resources/star.svg"
                      alt="star"
                    />
                    <Image
                      width={20}
                      height={20}
                      src="/images/resources/star.svg"
                      alt="star"
                    />
                    <Image
                      width={20}
                      height={20}
                      src="/images/resources/star.svg"
                      alt="star"
                    />
                  </div>
                  <Paragraph className="text-[#666666]">4.8/5.00</Paragraph>
                </div>
                <div className="flex items-center mt-3 gap-8">
                  <Paragraph className="text-[#666666] group-hover:text-white">
                    PDF Document
                  </Paragraph>
                  <Paragraph className="text-[#666666] group-hover:text-white">
                    245 Downloads
                  </Paragraph>
                </div>
                <Paragraph className=" text-[#666666] group-hover:text-white mb-0 mt-6">
                  {res.description}
                </Paragraph>
                <div className="flex justify-end  mt-6">
                  <div className="flex items-center gap-2">
                    <Button className="w-1/2 h-10 bg-transparent hover:bg-transparent text-[#666666] group-hover:text-white">
                    <Eye className="w-4 h-4" /> Preview
                  </Button>
                  <Button className="w-1/2 h-10 bg-[#00A896] hover:bg-[#057266] text-white">
                    <Download className="w-4 h-4 mr-1" /> Download
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
}
