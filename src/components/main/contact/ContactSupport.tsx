import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import { Clock4, Mail, MapPin, Phone, User } from "lucide-react";
import ContactForm from "./ContactForm";

const ContactSupport = () => {
  return (
    <div>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12 lg:py-16 xl:py-20">
          <SectionTopTitle
            title="Contact Us"
            desc="We welcome your questions, feedback, and suggestions. Please feel free to reach out to us through the following channels."
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mt-6 lg:mt-10 xl:mt-14">
            {/* Contact Information Section */}
            <div className="order-2 lg:order-1">
              <div className="mb-6 lg:mb-8 xl:mb-10">
                <Title className="mb-2 lg:mb-[6px] text-xl lg:text-2xl">Contact Information</Title>
                <Paragraph className="text-sm lg:text-base">
                  Fill out the form below to send us a message.
                </Paragraph>
              </div>
              
              <ul className="flex flex-col gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <User className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Name
                    </h4>
                    <p className="text-[#353535] text-sm lg:text-base font-inter font-normal">
                      Prosenjit Baidya
                    </p>
                    <p className="text-[#353535] text-xs lg:text-sm font-inter font-normal mt-1">
                      <b>Designation:</b> Disability Specialist, Age and
                      Disability Cross Cutting Unit, ISCG
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <Mail className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Email address
                    </h4>
                    <p className="text-[#353535] text-sm lg:text-base font-inter font-normal">
                      p.baidya@hi.org
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <Phone className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Phone
                    </h4>
                    <p className="text-[#353535] text-sm lg:text-base font-inter font-normal">
                      +880 1825 031014
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <MapPin className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Office Address
                    </h4>
                    <p className="text-[#353535] text-sm lg:text-base font-inter font-normal w-full lg:w-10/12 xl:w-3/4">
                      Coordination Hub, Kabita Soroni, Motel Road, Cox's
                      Bazar-4700, Bangladesh
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <Clock4 className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Office Time
                    </h4>
                    <p className="text-[#353535] text-sm lg:text-base font-inter font-normal">
                      Sunday – Thursday: 8:30 AM – 5:00 PM <br />
                      Friday – Saturday: Closed
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Form Section */}
            <div className="order-1 lg:order-2">
              <div className="mb-6 lg:mb-8 xl:mb-10">
                <Title className="mb-2 lg:mb-[6px] text-xl lg:text-2xl">Get in Touch</Title>
                <Paragraph className="text-sm lg:text-base">
                  Fill out the form below to send us a message.
                </Paragraph>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;