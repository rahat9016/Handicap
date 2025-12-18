"use client";
import { useGet } from "@/hooks/useGet";
import { IPageSection } from "@/types";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useCallback } from "react";
import HeroStatsSkeleton from "./HeroStatsSkeleton";
import { IDisabilityStats, IStatField } from "./types/interface";

const HomeHeroSection = () => {
  const local = useLocale() as "en" | "bn";
  const { data, isLoading } = useGet<IDisabilityStats>("/landing-page-config", [
    "user",
  ]);
  const { data: heroData } = useGet<IPageSection>(
    "/page-sections/query/first?page=HOME&sectionType=HERO",
    ["page-sections"]
  );

  const stats = data?.data;
  const hero = heroData?.data;

  const startItems = useCallback((): IStatField[] => {
    if (!stats) return [];

    const fields = Object.keys(stats)
      .filter((key) => key.startsWith("field"))
      .map((key) => stats[key as keyof IDisabilityStats])
      .filter(
        (field): field is IStatField => !!field && typeof field === "object"
      );

    return fields;
  }, [stats]);
  return (
    <section
      tabIndex={0}
      aria-label="Hero Section"
      className="relative w-full h-[30vh] md:h-[45vh] [@media(min-width:2560px)]:h-[60vh]   flex items-center justify-center"
    >
      {hero?.backgroundImageUrl && (
        <Image
          src={hero?.backgroundImageUrl ?? ""}
          alt="Disability inclusion"
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/40" />

      <div className="w-full lg:w-10/12 xl:w-9/12 relative z-10 text-center text-white px-4">
        <h1 className="text-[2vh] md:text-[3vh] xl:text-[5vh] text-white font-semibold font-inter drop-shadow-lg">
          {/* The Disability Inclusion Resource Hub Is <br />A Centralized Platform. */}{hero?.title?.[local] ?? hero?.title?.en}
        </h1>
        {isLoading ? (
          <HeroStatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:w-[65vw] mx-auto bg-white/10 backdrop-blur-md border border-white/30 rounded-lg px-6 py-2 md:py-5 mt-4">
            {startItems().map((item, index, array) => (
              <div
                key={index}
                className={`flex-1 text-center ${
                  index !== array.length - 1
                    ? "lg:border-r border-white/30"
                    : ""
                }`}
              >
                <p className="font-medium font-inter leading-none text-[1vh]  md:text-[1.5vh] xl:text-[2vh] px-1">
                  {item?.title?.[local] ?? item?.title?.en}
                </p>
                <p className="text-[1vh] md:text-[1.5vh]  lg:text-[2vh] font-medium mt-1 font-inter">
                  {item?.value?.[local] === "ডিফল্ট মান" ||
                  item?.value?.en === "Default Value"
                    ? "0"
                    : item?.value?.[local] ?? item?.value?.en}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeHeroSection;
