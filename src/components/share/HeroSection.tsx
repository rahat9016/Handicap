"use client";
import { useGet } from "@/hooks/useGet";
import Image from "next/image";
import HeroSkeleton from "../main/home/Skeleton/HeroSkeleton";
import { IPageSection } from "@/types";


export default function HeroSection() {

  const { data, isLoading } = useGet<IPageSection>(
    "/page-sections/query/first?page=ABOUT&sectionType=HERO",
    ["about-hero"]
  );

  if (isLoading) {
    return <HeroSkeleton />;
  }
  return (
    <div>
      <Image
        width={1920}
        height={318}
        src={data?.data?.imageUrls[0] || "/images/common/heroBg.jpg"}
        alt="heroBg"
        className="lg:h-[318px] h-[400px] object-fill"
      />
    </div>
  );
}
