import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";

export default function TechnicalSupport() {
  return (
    <div className="bg-white py-10 lg:py-40">
      <div className="container">
        <SectionTopTitle
          className="w-full lg:w-11/12 mx-auto"
          title="Technical Support"
          desc="Our dedicated technical support team is always ready to assist you with any questions, issues, or guidance you may need. We’re just a message away!"
        />
        <div className="w-full lg:w-7/12 mx-auto grid grid-cols-2 gap-4 lg:gap-8 mt-14">
          <div className="bg-[#F3F3F4] border border-[#AFC4FF]  p-8 rounded-2xl">
            <p
              className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]`}
            >
              Support Unit 01
            </p>
            <Title className="mt-6 text-base lg:text-lg">Platform Issues</Title>
            <Paragraph className="mt-3">
              For problems related to website functionality, account access, or
              resource downloads
            </Paragraph>
            <Title className="mt-3 text-sm lg:text-sm">
              support@disabilityinclusionhub.org
            </Title>
            <Paragraph className="mt-3">
              Response time: Within 24 hours on working days
            </Paragraph>
          </div>
          <div className="bg-[#F3F3F4] border border-[#AFC4FF]  p-8 rounded-2xl">
            <p
              className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]`}
            >
              Support Unit 01
            </p>
            <Title className="mt-6 text-base lg:text-lg">Platform Issues</Title>
            <Paragraph className="mt-3">
              For problems related to website functionality, account access, or
              resource downloads
            </Paragraph>
            <Title className="mt-3 text-sm lg:text-sm">
              support@disabilityinclusionhub.org
            </Title>
            <Paragraph className="mt-3">
              Response time: Within 24 hours on working days
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
}
