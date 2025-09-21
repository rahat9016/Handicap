import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import { Clock4, Mail, MapPin, Phone, User } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSupport() {
  return (
    <div>
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="Contact Us"
            desc="We welcome your questions, feedback, and suggestions. Please feel free to reach out to us through the following channels."
          />
          <div className="grid grid-cols-2 mt-7 lg:mt-14">
            <div>
              <div className="mb-10">
                <Title className="mb-[6px]">Contact Information</Title>
                <Paragraph>
                  Fill out the form below to send us a message.
                </Paragraph>
              </div>
              <ul className="flex flex-col gap-5 lg:gap-10">
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <User className="text-blue" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">
                      Name
                    </h4>
                    <p className="text-[#353535] text-sm font-inter font-normal">
                      Prosenjit Baidya
                    </p>
                    <p className="text-[#353535] text-xs font-inter font-normal">
                      <b>Designation:</b> Disability Specialist, Age and
                      Disability Cross Cutting Unit, ISCG
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <Mail className="text-blue" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">
                      Email address
                    </h4>
                    <p className="text-[#353535] text-sm font-inter font-normal">
                      p.baidya@hi.org
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <Phone className="text-blue" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">
                      Phone
                    </h4>
                    <p className="text-[#353535] text-sm font-inter font-normal">
                      +880 1825 031014
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <MapPin className="text-blue" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">
                      Office Address
                    </h4>
                    <p className="text-[#353535] text-sm font-inter font-normal w-full lg:w-1/2">
                      Coordination Hub, Kabita Soroni, Motel Road, Cox’s
                      Bazar-4700, Bangladesh
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <Clock4 className="text-blue" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">
                      Office Address
                    </h4>
                    <p className="text-[#353535] text-sm font-inter font-normal">
                      Sunday – Thursday: 8:30 AM – 5:00 PM <br />
                      Friday – Saturday: Closed
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-10">
                <Title className="mb-[6px]">Get in Touch</Title>
                <Paragraph>
                  Fill out the form below to send us a message.
                </Paragraph>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
