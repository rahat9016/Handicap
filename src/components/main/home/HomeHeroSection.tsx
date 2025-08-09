"use client"
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { IPageSection } from "@/types";
import Image from "next/image";
import HeroSkeleton from "./Skeleton/HeroSkeleton";




export default function HomeHeroSection() {
  const { data, isLoading } = useGet<IPageSection>(
      "/page-sections/query/first?page=HOME&sectionType=HERO",
      ["user"]
    );
  if(isLoading) { 
    return <HeroSkeleton />
  }
  
  return (
    <section
      tabIndex={0}
      aria-label="Hero Section"
      className="pt-10 pb-20 bg-white"
    >
      <div className="container">
        <div className="grid grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-5xl md:text-5xl font-bold leading-tight font-inter text-primary mb-6" tabIndex={0}>
            {data?.data?.title}
          </h1>
          <p className="text-lg font-inter font-normal text-[#666666]" tabIndex={0}>
           {data?.data?.subtitle}
          </p>
          <Button className="px-4 py-3 h-[46px] bg-[#2A53CD] hover:bg-[#0490EF] text-white border text-sm cursor-pointer font-inter font-medium">
            Browse Resources
          </Button>
          <Button className="ml-4 px-4 py-3 h-[46px] bg-transparent hover:bg-[#0490EF] text-[#2A53CD] hover:text-white border border-[#2A53CD52] text-sm cursor-pointer font-inter font-medium">
           Start Training
          </Button>
        </div>
        <div>
          <Image width={765} height={460} src={data?.data?.imageUrls[0] || ""} alt="hero" className="h-[460px] object-cover rounded-lg" />
        </div>
        </div>
      </div>
    </section>
  );
}
