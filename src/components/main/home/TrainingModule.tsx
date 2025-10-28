"use client";
import { INewsSection } from "@/components/news/AllNews/types";
import { useGet } from "@/hooks/useGet";
import Image from "next/image";
import NewsSlider from "./NewsHome/NewsSlider";
import HeroSkeleton from "./Skeleton/HeroSkeleton";
import { IPageSection } from "@/types";

export default function TrainingModule() {
  const { data } = useGet("/news", ["news"], {
    isPublished: true,
    page: "1",
    limit: "3",
  });

  const { data: newGalleryData, isLoading } = useGet<IPageSection>(
    "/page-sections/query/first?page=HOME&sectionType=NEWS_GALLERY",
    ["news-gallery"]
  );

  if (isLoading) {
    return <HeroSkeleton />;
  }
  const slides: INewsSection[] = Array.isArray(data?.data) ? data.data : [];
  return (
    <div className="relative h-[767px] w-full overflow-hidden">
      <Image
        width={1920}
        height={767}
        src={
          newGalleryData?.data?.backgroundImageUrl || ""
        }
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <NewsSlider slides={slides} />
    </div>
  );
}
