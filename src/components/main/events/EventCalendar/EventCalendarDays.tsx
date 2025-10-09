import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ICalendarDay } from "../types/interface";

const eventColors = [
  { bg: "#FECACA", text: "#991B1B" },
  { bg: "#A7F3D0", text: "#065F46" },
  { bg: "#BFDBFE", text: "#1E3A8A" },
  { bg: "#FEF08A", text: "#78350F" },
  { bg: "#E9D5FF", text: "#5B21B6" },
  { bg: "#FBCFE8", text: "#831843" },
  { bg: "#C7D2FE", text: "#3730A3" },
  { bg: "#99F6E4", text: "#134E4A" },
];

export default function EventCalendarDays({
  calendarDays,
  isLoading,
}: {
  calendarDays: ICalendarDay[];
  isLoading: boolean;
}) {
  const router = useRouter();

  const handleEventClick = (eventId: number) => {
    router.push(`/events/${eventId}`);
  };

  const getRandomColor = () => {
    const index = Math.floor(Math.random() * eventColors.length);
    return eventColors[index];
  };

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2 p-1 sm:p-2">
      {calendarDays.map((dayObj) => {
        const isToday = new Date().toISOString().slice(0, 10) === dayObj.date;
        const events = dayObj.events || [];

        return (
          <div
            key={dayObj.date}
            className="min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 border border-border bg-card rounded hover:bg-accent/50 transition-colors"
          >
            <div
              className={cn(
                "text-xs sm:text-sm font-medium mb-1 sm:mb-2",
                isToday ? "text-destructive font-bold" : "text-foreground"
              )}
            >
              {String(dayObj.day).padStart(2, "0")}
            </div>

            <div className="space-y-1">
              {isLoading
                ? Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-3 w-full rounded" />
                  ))
                : events.map((event) => {
                    const color = getRandomColor();
                    return (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event.id)}
                        className="text-xs p-1 rounded border cursor-pointer transition-colors hover:opacity-90 text-black"
                        style={{ backgroundColor: color.bg }}
                      >
                        <div className="font-medium line-clamp-1">
                          {event.title}
                        </div>
                        {event.location && (
                          <div className="text-[10px] opacity-80 mt-0.5 line-clamp-1">
                            {event.location}
                          </div>
                        )}
                      </div>
                    );
                  })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
