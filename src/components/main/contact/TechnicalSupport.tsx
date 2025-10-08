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

        {/* Additional Information */}
        <div className="w-full lg:w-10/12 xl:w-8/12 2xl:w-7/12 mx-auto mt-6 text-center">
          <div className="bg-[#F3F3F4] border border-[#AFC4FF] p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl hover:shadow-lg transition-shadow duration-300">
            <Title className="text-base sm:text-lg lg:text-xl font-semibold text-blue-900">
              Emergency Support
            </Title>
            <Paragraph className="mt-2 text-sm sm:text-base">
              For urgent technical issues affecting multiple users, please call:
              <span className="font-semibold block mt-1">+880 1825031014</span>
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
