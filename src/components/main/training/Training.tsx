import HeroSection from "@/components/common/HeroSection";
import { useTranslations } from "next-intl";
import Courses from "./Courses";

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
      {/* <EssentialFeatures /> */}
    </div>
  );
}
