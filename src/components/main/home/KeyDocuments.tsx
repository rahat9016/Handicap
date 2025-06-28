import SectionTopTitle from "@/components/share/SectionTopTitle";
import Image from "next/image";
import Link from "next/link";

const resources = [
  {
    title: "Humanitarian Inclusion Standards",
    type: "Guidelines",
    typeColor: "green",
    description:
      "Explore standards and best practices for including persons with disabilities in all stages of humanitarian response...",
    icon: "/images/home/icon_6.svg",
  },
  {
    title: "Washington Group Questions",
    type: "Assessment Tools",
    typeColor: "blue",
    description:
      "A set of internationally recognized questions to collect data on disability...",
    icon: "/images/home/icon_7.svg",
  },
  {
    title: "IASC Guidelines on Inclusion",
    type: "Guidelines",
    typeColor: "green",
    description:
      "The IASC Guidelines are a groundbreaking framework developed to ensure that all humanitarian responses are inclusive...",
    icon: "/images/home/icon_6.svg",
  },
  {
    title: "Accessibility Audit Toolkit",
    type: "Toolkit",
    typeColor: "yellow",
    description:
      "Helps humanitarian actors identify and remove physical barriers in key facilities...",
    icon: "/images/home/icon_5.svg",
  },
  {
    title: "Inclusive WASH Manual",
    type: "Manual",
    typeColor: "cyan",
    description:
      "Tools to identify and remove barriers in WASH-related infrastructure ensuring inclusiveness...",
    icon: "/images/home/icon_8.svg",
  },
  {
    title: "IASC Guidelines on Inclusion",
    type: "Guide",
    typeColor: "green",
    description:
      "These IASC Guidelines ensure humanitarian action includes persons with disabilities at every step...",
    icon: "/images/home/icon_6.svg",
  },
];

export default function KeyDocuments() {
  const colorClasses: Record<string, string> = {
    green: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]",
    blue: "bg-[#4F46E514] text-[#BBB7FF] border border-[#4F46E566]",
    yellow: "bg-[#EAB30814] text-[#EAB308] border border-[#EAB30866]",
    cyan: "bg-[#06B6D414] text-[#06B6D4] border border-[#06B6D466]",
  };
  return (
    <div>
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="Key Documents"
            desc="Access vocational training and employment opportunities designed to empower persons with disabilities—gain practical skills, receive career guidance, and connect with inclusive"
          />
          <div className="mt-8 lg:mt-[60px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
              {resources.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-[#F3F3F4] group hover:bg-[#252525] p-8"
                  tabIndex={0}
                >
                  <Image
                    src={res.icon}
                    alt={res.title}
                    width={32}
                    height={32}
                    className="group-hover:white-filter"
                  />
                  <p
                    className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full mt-8 mb-6 ${
                      colorClasses[res.typeColor]
                    }`}
                  >
                    {res.type}
                  </p>
                  <h3 className="text-lg font-semibold text-primary group-hover:text-white mt-6">
                    {res.title}
                  </h3>
                  <p className="text-sm font-normal text-[#666666] group-hover:text-white mb-0 mt-3">
                    {res.description}
                  </p>
                  <Link
                    href={"#"}
                    className="text-[#353535] block group-hover:text-[#B7B7B7] text-sm font-medium underline mt-6"
                  >
                    View Document
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
