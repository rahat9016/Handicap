"use client";
import { useGet } from "@/hooks/useGet";
import { cn } from "@/lib/utils";
import { IPageSection } from "@/types";
import Image from "next/image";
import HeroSectionSkeleton from "./HeroSectionSkeleton";

interface IHero {
  page: string;
  sectionType: string;
  title: string;
  desc?: string;
  className?: string;
  classTitle?: string;
  classDesc?: string;
}

const HeroSection = ({
  page,
  sectionType,
  title,
  desc,
  className,
  classTitle,
  classDesc,
}: IHero) => {
  const { data, isLoading } = useGet<IPageSection>(
    `/page-sections/query/first?page=${page}&sectionType=${sectionType}`,
    [page, sectionType, "hero-section"]
  );

  const imageUrl = data?.data?.imageUrls?.[0] ?? "";

  return (
    <div>
      {isLoading ? (
        <HeroSectionSkeleton />
      ) : (
        <div
          className={cn("relative w-full min-h-[30vh] max-h-[30vh]", className)}
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority
            className="object-cover object-center w-full h-full"
          />
          <div className=" absolute inset-0 bg-[linear-gradient(174deg,rgba(0,0,0,0)_25.63%,rgba(0,0,0,0.4)_44.73%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1
              className={cn(
                "text-[4vh] lg:text-[5vh] text-white font-semibold font-inter drop-shadow-lg",
                classTitle
              )}
            >
              {title}
            </h1>
            {desc && (
              <p
                className={cn(
                  "mt-[2vh] text-[2vh] lg:text-[2.5vh] text-white/90 font-inter font-medium w-full lg:w-6/12 leading-snug",
                  classDesc
                )}
              >
                {desc}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
