"use client";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { sampleEvents } from "@/components/main/events/EventCalendar"; 

const EventDetails = () => {
  const { locale, id } = useParams();
  const event = sampleEvents.find((e) => e.id === id);
  if (!event) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="my-20 w-full min-h-screen bg-background">
      <div className="container">
        {/* Event Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {/* Back Button */}
            <div>
              <Link href={`/${locale}/events`}>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Calendar
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {formatDate(event.date)}
              </span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {event.title}
          </h1>
          {event.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          )}
        </div>

        {/* Event Image */}
        {event.image && (
          <div className="mb-8">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Event Details */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Date & Time</div>
                <div className="text-muted-foreground">
                  {formatDate(event.date)}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-muted-foreground">
                  Event Venue - Address will be provided upon registration
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        {event.fullDescription && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {event.fullDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
