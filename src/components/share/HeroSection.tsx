"use client"
import { useGet } from "@/hooks/useGet";
import Image from "next/image";
import HeroSkeleton from "../main/home/Skeleton/HeroSkeleton";

export default function HeroSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useGet<any>(
      "/page-sections?pageIds=RESOURCES&sectionTypes=HERO",
      ["user"]
    );
  
   if (isLoading) {
       return <HeroSkeleton />;
     } 
  return (
    <div>
      <Image
        width={1920}
        height={318}
        src={data?.data[0]?.imageUrls[0] || "/images/common/heroBg.jpg"}
        alt="heroBg"
        className="lg:h-[318px] h-[400px] object-fill"
      />
    </div>
  );
}
