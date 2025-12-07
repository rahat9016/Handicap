import HeroSection from "@/components/common/HeroSection";
import { useTranslations } from "next-intl";
import ContactSupport from "./ContactSupport";
import FAQ from "./FAQ";
import TechnicalSupport from "./TechnicalSupport";

export default function Contact() {
  const t = useTranslations("Contact");
  return (
    <div>
      <HeroSection
        page="CONTACT"
        sectionType="HERO"
        title={t("contactUs")}
        desc={t("contactUsInfo")}
      />
      <ContactSupport />
      <FAQ />
      <TechnicalSupport />
    </div>
  );
}
