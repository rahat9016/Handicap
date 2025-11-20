import { Link } from "@/i18n/navigation";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const tHome = useTranslations("Home")
  const sections = [
    {
      title: tHome("quickAccess"),
      links: [
        { label: tNav("resources"), href: "/resources" },
        { label: tNav("training"), href: "/training" },
      ],
    },
    {
      title: tNav("about"),
      links: [
        { label: tNav("about"), href: "/about" },
        { label: tNav("contact"), href: "/contact" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("privacyPolicy"), href: "/privacy" },
        { label: t("privacyPolicy"), href: "/terms" },
        { label: t("accessibilityStatement"), href: "/accessibility" },
      ],
    },
  ];

  return (
    <footer
      className="bg-[#1F2B3A] text-white pt-8 md:pt-[51px] bg-contain bg-top bg-no-repeat"
      style={{ backgroundImage: `url('/images/common/footerBg.png')` }}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 xl:gap-28">
          {/* Company Info Section */}
          <div className="w-full lg:w-5/12 xl:w-4/12">
            <p
              className="text-sm text-[#B7B7B7] font-inter mb-6 lg:mb-9 leading-relaxed"
              tabIndex={0}
            >
              {t("inclusiveFutureMessage")}
            </p>
            <div className="space-y-3 text-sm">
              <div
                className="flex items-start gap-3 text-[#B7B7B7]"
                tabIndex={0}
                aria-label="Email"
              >
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <Link
                  href="mailto:info@disabilityinclusionresourcehub.com"
                  className="mt-0.5 hover:text-white transition-colors"
                >
                  info@disabilityinclusionresourcehub.com
                </Link>
              </div>
              <div
                className="flex items-start gap-3 text-[#B7B7B7]"
                tabIndex={0}
                aria-label="Contact Number"
              >
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="mt-0.5">+880 1825031014</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="w-full lg:w-7/12 xl:w-8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            {sections.map((section, idx) => (
              <div key={idx} className="mb-4">
                <h4
                  className="font-semibold mb-4 lg:mb-6 text-base"
                  tabIndex={0}
                >
                  {section.title}
                </h4>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-[#BABABA] hover:text-white transition-colors block group"
                      >
                        <span className="block pb-2">{link.label}</span>
                        <span className="block w-0 group-hover:w-full h-[1px] bg-[#535353] transition-all duration-300 mt-1"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Copyright Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center w-full py-6 lg:py-11 gap-4 sm:gap-0 mt-4 lg:mt-6">
        <div className="flex-grow border-t border-[#B3B3B3] hidden sm:block"></div>
        <span
          className="px-4 text-center font-inter font-normal text-xs sm:text-sm text-[#B3B3B3] whitespace-nowrap"
          tabIndex={0}
        >
          Copyright © 2025 ISCG & HI. All rights reserved.
        </span>
        <div className="flex-grow border-t border-[#B3B3B3] hidden sm:block"></div>
      </div>

      {/* Developer Credit */}
      {/* <div className="container px-4 sm:px-6 lg:px-8 text-xs text-[#B3B3B3] flex justify-center sm:justify-end pb-4 lg:pb-3">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span>|</span>
          <span>Developed by</span>
          <Link
            className="text-white"
            tabIndex={0}
            aria-label="Developed By A T I Limited"
            href={"https://atilimited.net/"}
            target="_blank"
          >
            <Image
              width={67}
              height={24}
              src="/images/common/ATI_Logo.png"
              alt="ATI_Logo"
              className="h-5 w-auto lg:h-6"
            />
          </Link>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
