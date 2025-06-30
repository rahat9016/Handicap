import SectionTopTitle from "@/components/share/SectionTopTitle";
import Image from "next/image";
import FAQAccordion from "../../share/FAQAccordion";

export default function FAQ() {
  return (
    <div className="mt-20 bg-[#F3F3F4] py-10 lg:py-20">
      <div className="container">
        <div className="flex flex-col items-center lg:flex-row gap-20 lg:gap-40">
          <div className="w-full lg:w-1/2">
            <Image
              width={723}
              height={426}
              src="/images/contact/3d-render-online-education-survey-test-concept.png"
              alt="education"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <SectionTopTitle
              className="mb-14"
              classDesc="lg:w-11/12"
              title="Frequently Asked Questions"
              desc="Find answers to common questions about the Disability Inclusion Resource Hub—covering how to access materials, who can benefit."
            />
            <FAQAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}
