"use client";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useGet } from "@/hooks/useGet";
import { IPageSection } from "@/types";
import { useLocale } from "next-intl";

export default function AboutUs() {
  const local = useLocale() as "en" | "bn";
  const { data } = useGet<IPageSection>(
    "/page-sections/query/first?page=ABOUT&sectionType=ABOUT_US",
    ["about-us"]
  );
  const { data: ourMission } = useGet<IPageSection>(
    "/page-sections/query/first?page=ABOUT&sectionType=OUR_MISSION",
    ["our_mission"]
  );
  const { data: ourVision } = useGet<IPageSection>(
    "/page-sections/query/first?page=ABOUT&sectionType=OUR_VISION",
    ["our_vision"]
  );
  const { data: whoWeServe } = useGet<IPageSection>(
    "/page-sections/query/first?page=ABOUT&sectionType=WHO_WE_SERVE",
    ["who_we_serve"]
  );
  const { data: organization } = useGet<IPageSection>(
    "/page-sections/query/first?page=ABOUT&sectionType=ORGANIZATION",
    ["organization"]
  );

  return (
    <div
      style={{
        backgroundImage: `url('/images/about/ProjectObjectivesBg.png')`,
      }}
      className="bg-no-repeat bg-contain"
    >
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title={data?.data?.title?.[local] ?? data?.data?.title.en ?? "--"}
            desc={
              data?.data?.content?.[local] ?? data?.data?.content.en ?? "--"
            }
            classTitle="text-left w-9/12 mx-auto"
            classDesc="text-left lg:w-9/12 font-normal"
          />
          <div className="w-full lg:w-9/12 mx-auto mt-6 lg:mt-10">
            <h3 className="text-primary text-lg font-inter font-medium">
              {ourMission?.data?.title?.[local] ??
                ourMission?.data?.title.en ??
                "--"}
            </h3>
            <p
              className="text-[#666666] text-justify text-xs lg:text-sm font-inter font-normal mt-3 "
              dangerouslySetInnerHTML={{
                __html:
                  ourMission?.data?.content?.[local] ??
                  ourMission?.data?.content.en ??
                  "--",
              }}
            ></p>
            <h3
              className="text-primary text-lg font-inter font-medium mt-5 lg:mt-10"
              dangerouslySetInnerHTML={{
                __html:
                  ourVision?.data?.title?.[local] ??
                  ourVision?.data?.title.en ??
                  "--",
              }}
            ></h3>
            <p
              className="text-[#666666] text-justify text-xs lg:text-sm font-inter font-normal mt-3"
              dangerouslySetInnerHTML={{
                __html:
                  ourVision?.data?.content?.[local] ??
                  ourVision?.data?.content.en ??
                  "--",
              }}
            ></p>
            <h3 className="text-primary text-lg font-inter font-medium mt-5 lg:mt-10">
              {whoWeServe?.data?.title?.[local] ??
                whoWeServe?.data?.title.en ??
                "--"}
            </h3>
            <p
              className="text-[#666666] text-justify text-xs lg:text-sm font-inter font-normal mt-3"
              dangerouslySetInnerHTML={{
                __html:
                  whoWeServe?.data?.content?.[local] ??
                  whoWeServe?.data?.content?.en ??
                  "--",
              }}
            />

            <h3 className="text-primary text-lg font-inter font-medium  mt-6 lg:mt-10">
              {organization?.data?.title?.[local] ??
                organization?.data?.title.en ??
                "--"}
            </h3>
            <p
              className="text-[#666666] text-justify text-xs lg:text-sm font-inter font-normal mt-3 "
              dangerouslySetInnerHTML={{
                __html:
                  organization?.data?.content?.[local] ??
                  organization?.data?.content.en ??
                  "--",
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}
