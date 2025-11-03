import HeroSection from "@/components/common/HeroSection";
import Events from "./Events";
import UpcomingLiveEvents from "./UpcomingLiveEvents";
import { useTranslations } from "next-intl";

export default function EventsPage() {
  const t = useTranslations("Events");

  return (
    <div>
      <HeroSection
        page="EVENTS"
        sectionType="HERO"
        title={t("events")}
        desc={t("eventsSectionDesc")}
      />
      <Events />
      <UpcomingLiveEvents />
    </div>
  );
}
