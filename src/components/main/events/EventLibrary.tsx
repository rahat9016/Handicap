import EventCard from "./CourseCard";
import { IEventItem } from "./types/interface";

export default function EventLibrary({
  events,
  viewMode = "grid",
}: {
  events: IEventItem[];
  viewMode?: "grid" | "list";
}) {
  return (
    <div>
      {events.length === 0 ? (
        <div className="h-[100vh] flex flex-col items-center justify-center bg-slate-50 rounded-sm">
          <h1 className="font-inter text-xl text-black">
            The event will be available soon
          </h1>
          <p className="text-sm font-inter">Please select right event type</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
              : "flex flex-col gap-y-4 divide-y divide-gray-200"
          }
        >
          {events.map((event, index) => (
            <EventCard key={index} {...event} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}
