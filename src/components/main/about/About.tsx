import HeroSection from "@/components/share/HeroSection";
import AboutUs from "./AboutUs";
import ImportanceOfDisabilityInclusion from "./ImportanceOfDisabilityInclusion";
import KeyStakeholders from "./KeyStakeholders";
import ProjectObjectives from "./ProjectObjectives";

export default function About() {
  return (
    <div>
        <HeroSection />
        <AboutUs />
        <ProjectObjectives />
        <KeyStakeholders/>
        <ImportanceOfDisabilityInclusion />
    </div>
  )
}
