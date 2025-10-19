import Events from "./Events";
import EventsHero from "./EventsHero";
import UpcomingLiveEvents from "./UpcomingLiveEvents";

export default function EventsPage() {
  return (
    <div>
      <EventsHero />
      <Events />
      <UpcomingLiveEvents />
    </div>
  );
}
