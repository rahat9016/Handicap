import HeroSection from "@/components/share/HeroSection";
import Courses from "./Courses";
import EarnRecognizedCertificates from "./EarnRecognizedCertificates";
import EssentialFeatures from "./EssentialFeatures";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";
import UpcomingLiveEvents from "./UpcomingLiveEvents";

export default function Training() {
  return (
    <div>
        <HeroSection/>
        <Courses />
        <UpcomingLiveEvents />
        <EssentialFeatures />
        <EarnRecognizedCertificates />
        <FrequentlyAskedQuestions />
    </div>
  )
}
