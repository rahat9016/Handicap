"use client";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { IPageSection } from "@/types";
import { useLocale } from "next-intl";
import Image from "next/image";
import HeroSkeleton from "./Skeleton/HeroSkeleton";

const HomeHeroSection = () => {
  const local = useLocale() as "en" | "bn";
  const router = useRouter();
  const { data, isLoading } = useGet<IPageSection>(
    "/page-sections/query/first?page=HOME&sectionType=HERO",
    ["user"]
  );

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section
      tabIndex={0}
      aria-label="Hero Section"
      className=""
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-10">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-inter text-primary mb-4 md:mb-6"
              tabIndex={0}
            >
              {data?.data?.title?.[local] ?? data?.data?.title?.en}
            </h1>

            {local === "en" ? (
              <div
                className="text-sm text-justify font-inter text-[#353535] font-normal mt-3 lg:mt-5 leading-[28px]"
                tabIndex={0}
                dangerouslySetInnerHTML={{
                  __html:
                    data?.data?.content?.[local] ??
                    data?.data?.content?.en ??
                    "",
                }}
              />
            ) : (
              <p
                className="text-sm font-inter text-[#353535] font-normal mt-3 lg:mt-5 leading-[28px]"
                tabIndex={0}
              >
                {(
                  data?.data?.content?.[local] ??
                  data?.data?.content?.en ??
                  ""
                ).replace(/<[^>]*>/g, "")}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mt-6 md:mt-8">
              <Button
                onClick={() => router.push("/resources")}
                className="w-full sm:w-auto px-4 py-3 h-[46px] bg-[#2A53CD] hover:bg-[#0490EF] text-white border text-sm cursor-pointer font-inter font-medium"
              >
                Browse Resources
              </Button>
              <Button
                onClick={() => router.push("/training")}
                className="w-full sm:w-auto px-4 py-3 h-[46px] bg-[#2A53CD] hover:bg-[#0490EF] text-white border text-sm cursor-pointer font-inter font-medium"
              >
                Start Training
              </Button>
            </div>
          </div>

          {/* Image */}
          {data?.data &&<div className="order-1 lg:order-2">
            <Image
              width={765}
              height={460}
              src={data?.data?.imageUrls?.[0] || "/placeholder-hero.jpg"}
              alt="hero"
              className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] object-cover rounded-lg"
              priority
            />
          </div>}
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
