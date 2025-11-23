"use client";
import { useGet } from "@/hooks/useGet";
import { cn } from "@/lib/utils";
import { IPageSection } from "@/types";
import Image from "next/image";
import HeroSectionSkeleton from "../common/HeroSectionSkeleton";

export default function HeroSection({ className }: { className?: string }) {
  const { data, isLoading } = useGet<IPageSection>(
    "/page-sections/query/first?page=ABOUT&sectionType=HERO",
    ["about-hero"]
  );

  return (
    <div>
      {isLoading ? (
        <HeroSectionSkeleton />
      ) : (
        <div
          className={cn("relative w-full min-h-[30vh] max-h-[30vh]", className)}
        >
          <Image
            src={data?.data?.imageUrls[0] || "/images/common/heroBg.jpg"}
            alt={"Handicap"}
            fill
            priority
            className="object-cover object-center w-full h-full"
          />
          <div className=" absolute inset-0 bg-[linear-gradient(174deg,rgba(0,0,0,0)_25.63%,rgba(0,0,0,0.4)_44.73%)]" />
        </div>
      )}
    </div>
  );
}
