import { useTranslations } from "next-intl";
import HeroSection from "../common/HeroSection";
import News from "./News";

export default function NewsPage() {
  const t = useTranslations("News");
  return (
    <div>
      <HeroSection
        page="NEWS"
        sectionType="HERO"
        title={t("news")}
        desc={t("newsSectionDesc")}
      />
      <News />
    </div>
  );
}
