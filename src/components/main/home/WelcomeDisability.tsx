"use client";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { IPageSection } from "@/types";
import { MoveRight } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import shape_1 from "../../../../public/images/common/shape_1.png";
import bg from "../../../../public/images/home/bg.png";
import WelcomeSkeleton from "./Skeleton/WelcomeSkeleton copy";

const WelcomeDisability = () => {
  const router = useRouter();
  const local = useLocale() as "en" | "bn";
  const { data, isLoading } = useGet<IPageSection>(
    "/page-sections/query/first?page=HOME&sectionType=IMAGE_GALLERY",
    [""]
  );

  if (isLoading) {
    return <WelcomeSkeleton />;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
      className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-cover bg-center"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center lg:flex-row gap-8 lg:gap-10 xl:gap-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div
              className="p-3 sm:p-4 bg-contain bg-no-repeat bg-center lg:bg-right"
              style={{
                backgroundImage: `url(${shape_1.src})`,
              }}
            >
              <Image
                src={data?.data?.imageUrls?.[0] || "/placeholder-welcome.jpg"}
                alt="welcome Img"
                width={590}
                height={410}
                className="w-full h-[300px] sm:h-[350px] lg:h-[380px] xl:h-[410px] object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="@container w-full flex flex-col lg:w-1/2 order-1 lg:order-2">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-primary font-inter font-semibold mt-2 lg:mt-4 leading-tight"
              tabIndex={0}
            >
              {data?.data?.title?.[local] ?? data?.data?.title?.en}
            </h1>

            <div tabIndex={0} className="mt-4 lg:mt-6">
              {local === "en" ? (
                <div
                  className="text-sm text-justify  sm:text-base font-inter text-[#353535] font-normal leading-relaxed sm:leading-[28px]"
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
                  className="text-sm sm:text-base font-inter text-[#353535] font-normal leading-relaxed sm:leading-[28px]"
                  tabIndex={0}
                >
                  {(
                    data?.data?.content?.[local] ??
                    data?.data?.content?.en ??
                    ""
                  ).replace(/<[^>]*>/g, "")}
                </p>
              )}
            </div>

            <div
              onClick={() => router.push("/about")}
              className="group flex items-center justify-center rounded-lg mt-10  w-full lg:w-[20%] border text-pureBlack hover:text-[#01014E] hover:shadow-lg text-base font-inter font-semibold px-4 py-2 cursor-pointer transition-all duration-300"
            >
              See more
              <MoveRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDisability;
