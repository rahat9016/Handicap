"use client";
import { useGet } from "@/hooks/useGet";
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
  const stats = data?.data;

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
      className="relative w-full h-[70vh] flex items-center justify-center"
    >
      <Image
        src="/images/home/heroBg.jpg"
        alt="Disability inclusion"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="w-full lg:w-9/12 xl:w-7/12 relative z-10 text-center text-white px-4">
        <h1 className="text-2xl md:text-5xl font-semibold font-inter mb-8 lg:mb-16  lg:leading-[56px]">
          The Disability Inclusion Resource Hub Is A Centralized Platform.
        </h1>
        {isLoading ? (
          <HeroStatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7 lg:gap-4 max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/30 rounded-lg px-6 py-5">
            {startItems().map((item, index, array) => (
              <div
                key={index}
                className={`flex-1 text-center ${
                  index !== array.length - 1
                    ? "lg:border-r border-white/30"
                    : ""
                }`}
              >
                <p className="font-medium font-inter text-base xl:text-lg leading-none">
                  {item?.title?.[local] ?? item?.title?.en}
                </p>
                <p className="text-xl xl:text-4xl font-semibold mt-1 font-inter">
                  {item?.value?.[local] ?? item?.value?.en}
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
