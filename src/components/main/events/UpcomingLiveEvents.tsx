"use client";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useGet } from "@/hooks/useGet";
import EventCard from "./CourseCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { IEventItem } from "./types/interface";
import { useTranslations } from "next-intl";

const UpcomingLiveEvents = () => {
  const { data, isLoading } = useGet<IEventItem[]>("/events/upcoming-events", [
    "events",
  ]);
  const t = useTranslations("Events")
  return (
    <div className="bg-[#F4F8FF]">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20 mb-20">
        <SectionTopTitle
          title={t("upcomingLiveEvents")}
          desc={t("liveEventsInfo")}
        />
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-20 mt-4 lg:mt-8">
          {/* <div className="w-full lg:w-[40%] order-2 lg:order-1 -mt-0 lg:-mt-32 lg:-mb-32">
            <div className="flex flex-col sm:flex-row items-end gap-4 sm:gap-5 lg:gap-6">
              <div className="relative w-full sm:w-1/2 lg:w-auto">
                <Image
                  width={307}
                  height={305}
                  src="/images/training/live1.jpg"
                  alt="Live event participants engaging in discussion"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="relative w-full sm:w-1/2 lg:w-auto">
                <Image
                  width={249}
                  height={205}
                  src="/images/training/live2.jpg"
                  alt="Training session in progress"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="relative mt-4 lg:mt-6 ml-0 lg:ml-14">
              <Image
                width={307}
                height={305}
                src="/images/training/live3.jpg"
                alt="Expert panel discussion"
                className="w-full lg:w-auto h-auto rounded-lg shadow-md"
              />
            </div>
          </div> */}

          {/* Content Section */}
          <div className="w-full lg:w-9/12 mx-auto order-1 lg:order-2">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            )}
            {/* <Paragraph className="text-[#666666] text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose">
              Stay connected and informed through our upcoming live events,
              including webinars, training sessions, community discussions, and
              expert panels focused on disability inclusion. These events
              provide valuable opportunities to learn, share experiences, and
              engage with practitioners, advocates, and persons with
              disabilities from across Bangladesh and beyond.
            </Paragraph> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingLiveEvents;
