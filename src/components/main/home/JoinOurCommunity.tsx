import SectionTopTitle from "@/components/share/SectionTopTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function JoinOurCommunity() {
  const t = useTranslations("Home");
  return (
    <div className="relative w-full bg-[#262D3D]">
      <div
        className="container bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/home/sentBg.png')` }}
      >
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            classTitle="text-white"
            classDesc="text-white"
            title={t("joinOurCommunity")}
            desc={t("communityMessage")}
          />
          <div className="w-full lg:w-7/12 mx-auto mt-[60px]">
            <div className="flex items-center gap-3">
              <Input
                placeholder={t('enterEmail')}
                className="border border-[#7297FF] h-[46px] focus:border-[#7297FF] placeholder:text-[#B7B7B7] bg-white"
              />
              <div>
                <Button className="bg-[#2A53CD] text-white h-[46px] flex items-center font-inter text-sm font-medium px-6">
                  {t('joinNow')}
                </Button>
              </div>
            </div>
            <p className="text-white text-sm font-inter font-normal mt-3">
             {t('privacyAgreement')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
