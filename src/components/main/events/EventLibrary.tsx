import EventCard from "./EventCard";
import { IEventItem } from "./types/interface";

export default function EventLibrary({
  events,
}: {
  events: IEventItem[];
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
            "flex flex-col gap-y-4 divide-y divide-gray-200"
          }
        >
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      )}
    </div>
  );
}
