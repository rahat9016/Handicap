"use client";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { Link } from "@/i18n/navigation";
import { format } from "date-fns";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import EventDetailsSkeleton from "./EventDetailsSkeleton";
import { IEventItem } from "./types/interface";

const EventDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGet<IEventItem>(`/events/${id}`, [
    "events",
    String(id),
  ]);
  const dateValue =
    typeof data?.data?.startDate === "string" ? data?.data?.startDate : "";

  return (
    <div className="container px-4 sm:px-6 lg:px-20 py-8 sm:py-12">
      {isLoading ? (
        <EventDetailsSkeleton />
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <Link href="/events" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="gap-2 bg-transparent w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Button>
            </Link>

            <div className="flex items-center gap-2 text-black text-sm sm:text-base font-inter">
              <Calendar className="h-5 w-5" />
              <span>
                {dateValue ? format(new Date(dateValue), "MMM dd, yyyy") : "—"}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6 font-inter">
            {data?.data?.title || "Loading..."}
          </h1>

          {/* Event Description */}
          {data?.data?.description && (
            <p
              className="text-base sm:text-lg text-black leading-relaxed mb-6 sm:mb-8"
              dangerouslySetInnerHTML={{ __html: data?.data?.description }}
            />
          )}

          {/* Event Image */}
          {data?.data?.images?.[0] && (
            <div className="mb-6 sm:mb-8 w-full h-[200px] sm:h-[350px] md:h-[450px] relative rounded-lg overflow-hidden bg-muted">
              <Image
                src={data?.data?.images[0].imageUrl || "/placeholder.svg"}
                alt={data?.data?.images[0].altText || "Event Image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Event Details Card */}
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black font-inter">
              Event Details
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 sm:mt-0" />
                <div>
                  <div className="font-medium text-sm sm:text-base">
                    Date & Time
                  </div>
                  <div className="text-muted-foreground text-sm sm:text-base">
                    {dateValue
                      ? format(new Date(dateValue), "MMM dd, yyyy")
                      : "—"}
                  </div>
                </div>
              </div>

              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 sm:mt-0" />
                <div>
                  <div className="font-medium text-sm sm:text-base">
                    Location
                  </div>
                  <div className="text-muted-foreground text-sm sm:text-base">
                    {data?.data?.address || "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Event Card */}
          {data?.data?.description && (
            <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-black font-inter">
                About This Event
              </h2>
              <div className="prose prose-sm sm:prose lg:prose-lg max-w-full">
                <p
                  className="text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data?.data?.description }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetails;
