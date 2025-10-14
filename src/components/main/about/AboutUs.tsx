import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("About");

  const whoWeServeList = [
    t("whoWeServeList.1"),
    t("whoWeServeList.2"),
    t("whoWeServeList.3"),
  ];

  const organizationsList = [
    t("organizationsList.1"),
    t("organizationsList.2"),
    t("organizationsList.3"),
  ];

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
            <h3 className="text-primary text-lg font-inter font-medium mt-5 lg:mt-10">
              {t("whoWeServe")}
            </h3>
            <ul className="list-disc text-[#7A7A8E] text-justify text-sm font-inter font-normal mt-3 pl-10">
              {whoWeServeList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3 className="text-primary text-lg font-inter font-medium mt-5 lg:mt-10">
              {t("organizations")}
            </h3>
            <ul className="list-disc text-[#7A7A8E] text-justify text-sm font-inter font-normal mt-3 pl-10">
              {organizationsList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
