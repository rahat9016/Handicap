"use client";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { IPageSection } from "@/types";
import { useLocale } from "next-intl";
import Image from "next/image";
import HeroSkeleton from "./Skeleton/HeroSkeleton";

export default function HomeHeroSection() {
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
      className="pt-10 pb-20 bg-white"
    >
      <div className="container">
        <div className="grid grid-cols-2 items-center gap-10">
          <div>
            <h1
              className="text-5xl md:text-5xl font-bold leading-tight font-inter text-primary mb-6"
              tabIndex={0}
            >
              {data?.data?.title?.[local] ?? data?.data?.title?.en}
            </h1>
            {local === "en" ? (
              <p
                className="text-sm font-inter text-[#353535] font-normal mt-3 lg:mt-5 leading-[28px]"
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

            <div className="flex items-center gap-2">
              <Button
              onClick={() => router.push("/resources")}
              className="px-4 py-3 h-[46px] bg-[#2A53CD] hover:bg-[#0490EF] text-white border text-sm cursor-pointer font-inter font-medium"
            >
              Browse Resources
            </Button>
            <Button
              onClick={() => router.push("/training")}
              className="px-4 py-3 h-[46px] bg-[#2A53CD] hover:bg-[#0490EF] text-white border text-sm cursor-pointer font-inter font-medium"
            >
              Start Training
            </Button>
            </div>
          </div>
          <div>
            <Image
              width={765}
              height={460}
              src={data?.data?.imageUrls[0] || ""}
              alt="hero"
              className="h-[460px] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
