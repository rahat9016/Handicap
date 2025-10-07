import HeroSection from "@/components/share/HeroSection";
import Courses from "./Courses";
import EarnRecognizedCertificates from "./EarnRecognizedCertificates";
import EssentialFeatures from "./EssentialFeatures";
import UpcomingLiveEvents from "./UpcomingLiveEvents";

export default function Training() {
  return (
    <div>
      <HeroSection />
      <Courses />
      <UpcomingLiveEvents />
      <EssentialFeatures />
      <EarnRecognizedCertificates />
    </div>
  );
}
