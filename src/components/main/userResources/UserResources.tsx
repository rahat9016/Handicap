import HeroSection from "@/components/common/HeroSection";
import { useTranslations } from "next-intl";
import AccessibleResources from "./AccessibleResources";
import FeaturedResources from "./FeaturedResources";
import ResourcesFilter from "./ResourcesFilter";

export default function UserResources() {
  const t = useTranslations("ResourceLibrary");
  return (
    <div>
      <HeroSection
        page="RESOURCES"
        sectionType="HERO"
        title={t("resourceLibrary")}
        desc={t("featuredResourcesDesc")}
      />
      <ResourcesFilter />
      <FeaturedResources />
      <AccessibleResources />
    </div>
  );
}
