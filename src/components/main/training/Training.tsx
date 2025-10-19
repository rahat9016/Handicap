import Courses from "./Courses";
import EarnRecognizedCertificates from "./EarnRecognizedCertificates";
import EssentialFeatures from "./EssentialFeatures";
import TrainingHero from "./TrainingHero";

export default function Training() {
  return (
    <div>
      <TrainingHero />
      <Courses />
      <EssentialFeatures />
      <EarnRecognizedCertificates />
    </div>
  );
}
