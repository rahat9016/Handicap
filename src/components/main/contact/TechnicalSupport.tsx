import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";

const TechnicalSupport = () => {
  return (
    <div className="bg-white py-8 sm:py-12 lg:py-16 xl:py-24 2xl:py-40">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionTopTitle
          className="w-full lg:w-11/12 xl:w-10/12 mx-auto"
          title="Technical Support"
          desc="Our dedicated technical support team is always ready to assist you with any questions, issues, or guidance you may need. We're just a message away!"
        />
        
        <div className="w-full lg:w-10/12 xl:w-8/12 2xl:w-7/12 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12 xl:mt-14">
          {/* Support Card 1 */}
          <div className="bg-[#F3F3F4] border border-[#AFC4FF] p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <p
              className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]`}
            >
              Support Unit 01
            </p>
            <Title className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl font-semibold">
              Platform Issues
            </Title>
            <Paragraph className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed">
              For problems related to website functionality, account access, or
              resource downloads
            </Paragraph>
            <Title className="mt-2 sm:mt-3 text-sm sm:text-base font-medium break-words">
              support@disabilityinclusionhub.org
            </Title>
            <Paragraph className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
              Response time: Within 24 hours on working days
            </Paragraph>
          </div>

          {/* Support Card 2 */}
          <div className="bg-[#F3F3F4] border border-[#AFC4FF] p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <p
              className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]`}
            >
              Support Unit 02
            </p>
            <Title className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl font-semibold">
              Content & Resources
            </Title>
            <Paragraph className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed">
              For questions about resource content, training materials, or
              accessibility guidance
            </Paragraph>
            <Title className="mt-2 sm:mt-3 text-sm sm:text-base font-medium break-words">
              content@disabilityinclusionhub.org
            </Title>
            <Paragraph className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
              Response time: Within 48 hours on working days
            </Paragraph>
          </div>
        </div>

        {/* Additional Information */}
        <div className="w-full lg:w-8/12 xl:w-6/12 mx-auto mt-8 sm:mt-10 lg:mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 text-center">
            <Title className="text-base sm:text-lg lg:text-xl font-semibold text-blue-900">
              Emergency Support
            </Title>
            <Paragraph className="mt-2 text-sm sm:text-base text-blue-800">
              For urgent technical issues affecting multiple users, please call: 
              <span className="font-semibold block mt-1">+880 XXX XXX XXXX</span>
            </Paragraph>
            <Paragraph className="mt-2 text-xs sm:text-sm text-blue-700">
              Available 24/7 for critical platform outages
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSupport;