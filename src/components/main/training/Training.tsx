import HeroSection from "@/components/share/HeroSection";
import Courses from "./Courses";
import EarnRecognizedCertificates from "./EarnRecognizedCertificates";
import EssentialFeatures from "./EssentialFeatures";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";

export default function Training() {
  return (
    <div>
        <HeroSection/>
        <Courses />
        <EssentialFeatures />
        <EarnRecognizedCertificates />
        <FrequentlyAskedQuestions />
    </div>
  )
}
