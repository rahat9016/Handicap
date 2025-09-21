import HeroSection from "@/components/share/HeroSection";
import AboutUs from "./AboutUs";
import ImportanceOfDisabilityInclusion from "./ImportanceOfDisabilityInclusion";
import KeyStakeholders from "./KeyStakeholders";
import ProjectObjectives from "./ProjectObjectives";
import WhoWeServe from "./WhoWeServe";

export default function About() {
  return (
    <div>
        <HeroSection />
        <AboutUs />
        <WhoWeServe />
        <ProjectObjectives />
        <KeyStakeholders/>
        <ImportanceOfDisabilityInclusion />
    </div>
  )
}
