import SectionTopTitle from "@/components/share/SectionTopTitle";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function OurHonorableFounders() {
  const t = useTranslations("Home");
  return (
    <div className="relative w-full bg-cover bg-center">
      <div className="container">
        <div className="py-10 lg:py-10">
          <SectionTopTitle
            title={t("withTheSupportOf")}
            desc={t("hubFundingInfo")}
          />
          <div className="flex gap-12 flex-col">
            <Image
              width={814}
              height={114}
              src={`/images/home/aus.png`}
              alt="Founders "
              className="h-32 w-auto mx-auto mt-5 py-4"
            />
            <div className=" flex justify-center items-center gap-12 max-lg:flex-col">
              <Image
                width={752}
                height={316}
                src={`/images/home/sponsor2.jpeg`}
                alt="Founders"
                className="h-32 w-auto  "
              />
              <Image
                width={622}
                height={308}
                src={`/images/home/sponsor3.jpeg`}
                alt="Founders"
                className=" h-32 w-auto  "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
