import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

export default function Footer() {
  const sections = [
    {
      title: "Quick Access",
      links: [
        "Platform Statistics",
        "Find Resources",
        "Quick Access",
        "Key Documents",
        "Time Frame of Success",
      ],
    },
    {
      title: "Resources",
      links: [
        "Guidelines",
        "Training Materials",
        "Research Respire",
        "Tools & Templates",
        "IEC Materials",
      ],
    },
    {
      title: "About",
      links: [
        "About the Project",
        "Humanity & Inclusion",
        "ADTWG",
        "Partners",
        "Contact Us",
      ],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
        "Accessibility Statement",
        "GDPR Compliance",
      ],
    },
  ];

  return (
    <footer
      className="bg-[#1F2B3A] text-white pt-[51px] bg-contain bg-top bg-no-repeat"
      style={{ backgroundImage: `url('/images/common/footerBg.png')` }}
    >
      <div className="container">
        <div className="flex items-start flex-col lg:flex-row gap-14 lg:gap-28">
          <div className="w-full lg:w-4/12">
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={40}
              className="white-filter mb-5"
              tabIndex={0}
              aria-label="logo of humanity and inclusive"
            />
            <p className="text-sm text-[#B7B7B7] font-inter mb-9"  tabIndex={0}>
              Working together to build an inclusive, accessible, and empowered
              future for persons with disabilities—where everyone has the
              opportunity to participate fully, live with dignity, and
              contribute meaningfully to society, regardless of ability.
            </p>
            <div className="space-y-1 text-sm">
              <p className="flex items-start gap-3 text-[#B7B7B7]" tabIndex={0} aria-label="Email">
                <Mail />
                <Link
                  href="mailto:info@disabilityinclusionhub.org"
                  className="mt-1"
                >
                  info@disabilityinclusionhub.org
                </Link>
              </p>
              <p className="flex items-start gap-3 text-[#B7B7B7]"tabIndex={0} aria-label="Contact Number">
                <Phone /> <span tabIndex={0}>+880 1234 567890</span>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-8/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
            {sections.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-6" tabIndex={0}>{section.title}</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  {section.links.map((linkText, i) => (
                    <li
                      key={i}
                      className="text-[#BABABA] hover:text-white mt-2"
                    >
                      <Link href={`/${slugify(linkText)}`}>
                        {linkText}
                        <span className="block w-full h-[1px] bg-[#535353] mt-2"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 pt-8">
        <div className="flex items-center gap-10 lg:gap-20 bg-[#3D465A] border border-[#FFFFFF4D] h-14 px-10 lg:px-20 rounded-full ">
          <Link href="#" className="hover:text-[#5ABBFD]" aria-label="Facebook Account Link">
            <FaFacebookF />
          </Link>
          <Link href="#" className="hover:text-[#5ABBFD]" aria-label="Twitter Account  Link">
            <FaTwitter />
          </Link>
          <Link href="#" className="hover:text-[#5ABBFD]" aria-label="Instagram Account Link">
            <FaInstagram />
          </Link>
          <Link href="#" className="hover:text-[#5ABBFD]" aria-label="Linkedin Account Link">
            <FaLinkedinIn />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center w-full py-11 text-xs text-[#B3B3B3]">
        <div className="flex-grow border-t border-[#B3B3B3]"></div>
        <span className="px-4 text-center font-inter font-normal text-sm" tabIndex={0}>
          © 2025 Humanity & Inclusion. All rights reserved. Funded by DFAT.
        </span>
        <div className="flex-grow border-t border-[#B3B3B3]"></div>
      </div>
      <div className="container text-xs text-[#B3B3B3] flex justify-end pb-3">
        <p className="flex items-center gap-3">
          Designed by{" "}
          <span className="text-white">
            <Image
              width={46}
              height={24}
              src="/images/common/CMLogo.png"
              alt="ATI_Logo"
            />
          </span>{" "}
          <span className="px-4">|</span> Developed by{" "}
          <span className="text-white" tabIndex={0} aria-label="Developed By A T I Limited">
            <Image
              width={67}
              height={24}
              src="/images/common/ATI_Logo.png"
              alt="ATI_Logo"
            />
          </span>
        </p>
      </div>
    </footer>
  );
}
