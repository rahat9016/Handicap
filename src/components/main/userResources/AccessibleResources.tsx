import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import Image from "next/image";

const resources = [
  {
    title: "Multiple Formats",
    image:"/images/resources/icon1.png",
    description:
      "Resources are available in multiple formats (PDF, Word, Video, Audio) to accommodate different accessibility needs.",
  },
  {
    title: "Screen Reader Compatible",
    image:"/images/resources/icon3.png",
    description:
      "All documents are optimized for screen readers, with proper headings, alternative text, and document structure.",
  },
  {
    title: "Multilingual",
    image:"/images/resources/icon2.png",
    description:
      "Many resources are available in both English and Bangla to ensure accessibility for local and international users.",
  },
];

export default function AccessibleResources() {
  return (
    <div className="bg-white">
      <div className="container py-10 lg:py-20 xl:py-40">
        <SectionTopTitle
          title="Accessible Resources"
          desc="Our resources are designed to be accessible to all users, including persons with disabilities—featuring formats that support screen readers, alternative text."
        />
        <div className="w-full lg:w-9/12 mx-auto mt-7 lg:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, idx) => (
              <div
                key={idx}
                className="text-center"
              >
               <div className="w-[89px] h-[89px] rounded-full mx-auto bg-[#5ABBFD0D] flex items-center justify-center">
                <div className="bg-[#5ABBFD1A] w-[69px] h-[69px] rounded-full flex items-center justify-center">
                  <Image width={40} height={40} src={res.image} alt={res.title} />
                </div>
               </div>
                <Title className="lg:text-lg group-hover:text-white mt-6">
                  {res.title}
                </Title>
                <Paragraph className=" text-[#666666] group-hover:text-white mb-0 mt-3">
                  {res.description}
                </Paragraph>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}