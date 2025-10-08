"use client";
import { INewsSection } from "@/components/news/AllNews/types";
import { useGet } from "@/hooks/useGet";
import Image from "next/image";
import NewsSlider from "./NewsHome/NewsSlider";

export default function TrainingModule() {
  const { data } = useGet("/news", ["news"], {
    page: "1",
    limit: "3",
  });
  const slides: INewsSection[] = Array.isArray(data?.data) ? data.data : [];
  return (
    <div className="relative h-[767px] w-full overflow-hidden">
      <Image
        width={1920}
        height={767}
        src="/images/home/hero1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <NewsSlider slides={slides} />
    </div>
  );
}
