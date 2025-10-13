import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import { useTranslations } from "next-intl";
import Image from "next/image";

const EarnRecognizedCertificates = () => {
  const t = useTranslations("Training");
  const listEarn = [
    t("officialRecognition"),
    t("buildCredentials"),
    t("boostEmployability"),
    t("globallyAccepted"),
    t("trackProgress"),
    t("issuedUponCompletion"),
    t("careerGrowthStep"),
  ];
  return (
    <div className="bg-[#f3f3f3]">
      <div className="container py-10 lg:py-20">
        <SectionTopTitle
          title={t("earnCertificates")}
          desc={t("certificateInfo")}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 mt-14">
          <div>
            <Paragraph>{t("success")}</Paragraph>
            <Title>{t("earnRecognizedCertificates")}</Title>
            <Paragraph className="mt-4">
              {t("certificateProgramInfo")}
            </Paragraph>
            <div className="flex flex-col gap-3 mt-9">
              {listEarn.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image
                    width={20}
                    height={20}
                    src="/images/course/verify.svg"
                    alt={item}
                  />
                  <Paragraph>{item}</Paragraph>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Image
              width={706}
              height={473}
              src="/images/course/certificates.jpg"
              alt={"certificates"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnRecognizedCertificates;
