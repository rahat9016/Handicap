"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  color: "orange" | "blue" | "pink" | "green" | "purple";
  image?: string;
  fullDescription?: string;
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Canvas Festival",
    description:
      "Join us for a celebration of creativity and innovation. Experience art, music, and technology.",
    fullDescription:
      "Join us for a spectacular celebration of creativity and innovation at the Canvas Festival. This multi-day event brings together artists, musicians, technologists, and creative minds from around the world. Experience interactive art installations, live music performances, cutting-edge technology demonstrations, and workshops led by industry experts. Whether you're an artist, a tech enthusiast, or simply someone who appreciates creativity, this festival offers something for everyone.",
    date: new Date(2025, 4, 8), // May 8, 2025
    color: "orange",
    image: "/logo.png",
  },
  {
    id: "2",
    title: "Code Booth",
    description: "Coding workshop and networking event for developers.",
    fullDescription:
      "The Code Booth is an intensive coding workshop and networking event designed for developers of all skill levels. Join fellow programmers, software engineers, and tech enthusiasts for hands-on coding sessions, technical talks, and collaborative projects. Learn about the latest programming languages, frameworks, and development tools while building meaningful connections in the tech community.",
    date: new Date(2025, 4, 6), // May 6, 2025
    color: "blue",
    image: "/logo.png",
  },
  {
    id: "3",
    title: "EcoFashion Fair",
    description:
      "Sustainable fashion showcase featuring eco-friendly brands and designers.",
    fullDescription:
      "The EcoFashion Fair is a groundbreaking sustainable fashion showcase that brings together eco-conscious brands, innovative designers, and environmentally aware consumers. Discover the latest trends in sustainable fashion, learn about ethical manufacturing processes, and explore how the fashion industry is evolving to protect our planet. Meet designers who are pioneering new materials and production methods that minimize environmental impact.",
    date: new Date(2025, 4, 19), // May 19, 2025
    color: "pink",
    image: "/logo.png",
  },
  {
    id: "4",
    title: "Canvas Festival",
    description: "Second day of the creativity festival.",
    fullDescription:
      "Continue your creative journey on the second day of the Canvas Festival. Today's program features advanced workshops, artist collaborations, and exclusive exhibitions. Dive deeper into the intersection of art and technology with specialized sessions on digital art, virtual reality experiences, and interactive media installations.",
    date: new Date(2025, 4, 21), // May 21, 2025
    color: "orange",
    image: "/logo.png",
  },
  {
    id: "5",
    title: "Canvas Festival",
    description: "Workshop sessions and exhibitions.",
    fullDescription:
      "Day three of the Canvas Festival focuses on hands-on workshop sessions and curated exhibitions. Participate in masterclasses led by renowned artists, explore gallery exhibitions featuring emerging talents, and engage in collaborative art projects. This day is perfect for those looking to develop their creative skills and connect with like-minded individuals.",
    date: new Date(2025, 4, 22), // May 22, 2025
    color: "orange",
    image: "/logo.png",
  },
  {
    id: "6",
    title: "Canvas Festival",
    description: "Final day celebrations.",
    fullDescription:
      "Join us for the grand finale of the Canvas Festival! The final day features spectacular performances, award ceremonies, and closing celebrations. Witness the unveiling of collaborative artworks created throughout the festival, enjoy live performances by featured artists, and celebrate the creative community that has come together over these amazing days.",
    date: new Date(2025, 4, 23), // May 23, 2025
    color: "orange",
    image: "/logo.png",
  },
  {
    id: "7",
    title: "Wall May Fest",
    description: "Street art and mural festival.",
    fullDescription:
      "Wall May Fest is an exciting street art and mural festival that transforms urban spaces into vibrant canvases. Watch talented street artists create stunning murals in real-time, participate in graffiti workshops, and explore the rich history and culture of street art. This festival celebrates the raw creativity and social commentary that street art brings to our communities.",
    date: new Date(2025, 4, 30), // May 30, 2025
    color: "green",
    image: "/logo.png",
  },
  {
    id: "8",
    title: "Bloom Link Forum",
    description: "Networking event for creative professionals.",
    fullDescription:
      "The Bloom Link Forum is an exclusive networking event designed for creative professionals across various industries. Connect with fellow creatives, share ideas, collaborate on projects, and build lasting professional relationships. The forum features panel discussions, networking sessions, portfolio reviews, and opportunities to showcase your work to industry leaders.",
    date: new Date(2025, 4, 30), // May 30, 2025
    color: "purple",
    image: "/logo.png",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const eventColors = {
  orange: "bg-orange-100 border-orange-200 text-orange-800 hover:bg-orange-200",
  blue: "bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200",
  pink: "bg-pink-100 border-pink-200 text-pink-800 hover:bg-pink-200",
  green: "bg-green-100 border-green-200 text-green-800 hover:bg-green-200",
  purple: "bg-purple-100 border-purple-200 text-purple-800 hover:bg-purple-200",
};

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025
  const router = useRouter();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date: number) => {
    const targetDate = new Date(year, month, date);
    return sampleEvents.filter(
      (event) =>
        event.date.getDate() === date &&
        event.date.getMonth() === month &&
        event.date.getFullYear() === year
    );
  };

  const { locale } = useParams();

  const handleEventClick = (eventId: string) => {
    router.push(`/${locale}/events/${eventId}`);
  };

  const renderCalendarDays = () => {
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="min-h-[100px] sm:min-h-[120px] p-1 sm:p-2 border border-border bg-muted/20"
        >
          <div className="text-xs sm:text-sm text-muted-foreground">
            {new Date(year, month, -firstDayOfWeek + i + 1).getDate()}
          </div>
        </div>
      );
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day);
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === month &&
        new Date().getFullYear() === year;

      days.push(
        <div
          key={day}
          className="min-h-[100px] sm:min-h-[120px] p-1 sm:p-2 border border-border bg-card hover:bg-accent/50 transition-colors"
        >
          <div
            className={cn(
              "text-xs sm:text-sm font-medium mb-1 sm:mb-2",
              isToday ? "text-destructive font-bold" : "text-foreground"
            )}
          >
            {day.toString().padStart(2, "0")}
          </div>
          <div className="space-y-1">
            {events.map((event, index) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className={cn(
                  "text-xs p-1 rounded border text-balance leading-tight cursor-pointer transition-colors",
                  eventColors[event.color]
                )}
              >
                <div className="font-medium line-clamp-1">{event.title}</div>
                {event.description && (
                  <div className="text-xs opacity-80 mt-0.5 line-clamp-1 sm:line-clamp-2 hidden sm:block">
                    {event.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Add empty cells for days after the last day of the month
    const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDayOfWeek + daysInMonth);

    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="min-h-[100px] sm:min-h-[120px] p-1 sm:p-2 border border-border bg-muted/20"
        >
          <div className="text-xs sm:text-sm text-muted-foreground">{i}</div>
        </div>
      );
    }

    return days;
  };

  return (
    <Card className="max-w-7xl mx-auto p-3 sm:p-6 bg-background">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Event Calendar
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground text-balance px-4">
          Stay updated with important academic dates, events, and deadlines
          throughout the academic year.
        </p>
      </div>

      {/* Navigation and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
        {/* Month Navigation */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("prev")}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <h2 className="text-lg sm:text-xl font-semibold min-w-[140px] text-center">
            {months[month]} {year}
          </h2>

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("next")}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* View Controls */}
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-sm bg-transparent"
          >
            Today
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 bg-muted">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className="p-2 sm:p-3 text-center font-medium text-xs sm:text-sm border-r border-border last:border-r-0"
            >
              <div className="hidden sm:block">{day}</div>
              <div className="sm:hidden">{day.slice(0, 3)}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {(index + 1).toString().padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">{renderCalendarDays()}</div>
      </div>
    </Card>
  );
}

export { sampleEvents };
export type { Event };
