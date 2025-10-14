import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("About");
  return (
    <div>
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title={t("aboutUs")}
            desc={t("aboutUsInfo")}
            classTitle="text-left w-9/12 mx-auto"
            classDesc="text-left lg:w-9/12"
          />
          <div className="w-full lg:w-9/12 mx-auto mt-10 lg:mt-20">
            <h3 className="text-primary text-lg font-inter font-medium">
              {t("ourMission")}
            </h3>
            <p className="text-[#7A7A8E] text-justify text-sm font-inter font-normal mt-3 ">
              {t("ourMissionInfo")}
            </p>
            <h3 className="text-primary text-lg font-inter font-medium mt-5 lg:mt-10">
              {t("ourVision")}
            </h3>
            <p className="text-[#7A7A8E] text-justify text-sm font-inter font-normal mt-3">
              {t("ourVisionInfo")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
