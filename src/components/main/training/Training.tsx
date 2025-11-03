import HeroSection from "@/components/common/HeroSection";
import Courses from "./Courses";
import EssentialFeatures from "./EssentialFeatures";
import { useTranslations } from "next-intl";

export default function Training() {
  const t = useTranslations("Training");
  return (
    <div>
      <HeroSection
        page="TRAINING"
        sectionType="HERO"
        title={t("training")}
        desc={t("trainingSectionDesc")}
      />
      <Courses />
      <EssentialFeatures />
    </div>
  );
}
