"use client";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useGet } from "@/hooks/useGet";
import { useTranslations } from "next-intl";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { IEventItem } from "./types/interface";

const UpcomingLiveEvents = () => {
  const { data, isLoading } = useGet<IEventItem[]>("/events/upcoming-events", [
    "events",
  ]);
  const t = useTranslations("Events");
  return (
    <div className="bg-[#F4F8FF]">
      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20 mb-20">
        <SectionTopTitle
          title={t("upcomingLiveEvents")}
          desc={t("liveEventsInfo")}
        />
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-20 mt-4 lg:mt-8">
          <div className="w-full  mx-auto order-1 lg:order-2">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, index) => (
                  <EventCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {data?.data.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingLiveEvents;
