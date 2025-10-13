import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useTranslations } from "next-intl";

export default function ThankyouSection() {
  const t = useTranslations("Home");
  return (
    <div className="relative w-full bg-cover bg-center">
      <div className="container">
        <div className="py-7 lg:py-10">
          <SectionTopTitle
            title={t("thankYouForYourSupport")}
            desc={t("thankYouOrganizations")}
          />
        </div>
      </div>
    </div>
  );
}
