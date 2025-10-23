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
          <div className="w-9/12 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
              <div className="flex items-center justify-center">
                <Image
                  width={814}
                  height={114}
                  src="/images/home/aus.png"
                  alt="Founders"
                  className="h-32 w-auto py-4"
                />
              </div>

              <div className="flex items-center justify-center">
                <Image
                  width={622}
                  height={308}
                  src="/images/home/sponsor3.jpeg"
                  alt="Founders"
                  className="h-32 w-auto"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  width={752}
                  height={316}
                  src="/images/home/sponsor2.jpeg"
                  alt="Founders"
                  className="h-32 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
