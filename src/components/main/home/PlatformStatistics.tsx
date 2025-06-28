import SectionTopTitle from "@/components/share/SectionTopTitle";
import Image from "next/image";

export default function PlatformStatistics() {
  return (
    <div className="container">
      <div className="py-10 lg:py-20">
        <SectionTopTitle title="Platform Statistics" desc="All resources are designed to be accessible and follow WCAG 2.1
            guidelines, ensuring that persons with disabilities can access and
            utilize these materials."/>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-[60px]">
          {[
            {
              label: "Total Resources",
              value: 245,
              icon: '/images/home/icon_5.svg',
              title: "Total Resources",
              desc: "Explore our growing library of tools, guides, training materials, and support documents",
              weakThisMonth: "+12 this month",
            },
            {
              label: "Total Downloads",
              value: 1234,
              icon: '/images/home/icon_6.svg',
              title: "Total Downloads",
              desc: "Our resources have been downloaded over 8,500 times, making a nationwide impact through accessible",
              weakThisMonth: "+256 this month",
            },
            {
              label: "Active Users",
              value: 89,
              icon: '/images/home/icon_1.svg',
              title: "Active Users",
              desc: "Join a growing community of 3,200+ active users engaging with our platform every month",
              weakThisMonth: "+7 this week",
            },
            {
              label: "Training Completion",
              value: 156,
              icon: '/images/home/icon.svg',
              title: "Training Completions",
              desc: "More than 1,200 individuals have completed our training programs, advancing their knowledge",
              weakThisMonth: "+23 this month",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative group bg-[#F3F3F4] p-6 border border-gray-200 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 before:absolute before:inset-0 before:bg-[url('/images/home/platformBg.png')] before:bg-cover before:bg-center before:opacity-100" />

              <div className="relative">
                <Image width={32} height={32} src={item.icon} alt="icon" className="group-hover:white-filter h-8" />
                <p className="text-3xl font-medium font-inter group-hover:text-white text-pureBlack mt-5">
                  {item.value}{" "}
                  <span className="text-xs font-inter text-[#666666]">
                    {item.weakThisMonth}
                  </span>
                </p>
                <span className="block w-full h-[1px] group-hover:bg-white bg-[#6C6C6C] mt-3"></span>
                <p className="text-lg font-inter font-medium group-hover:text-white text-pureBlack mt-3">
                  {item.label}
                </p>
                <p className="text-xs font-inter font-medium text-[#666666] mt-3">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
