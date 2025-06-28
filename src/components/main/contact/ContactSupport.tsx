import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import { Clock4, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactSupport() {
  return (
    <div>
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="About Us"
            desc="We’re glad to see you again. Please sign in to continue using your account, manage your services, or stay updated with our latest initiatives."
          />
          <div className="grid grid-cols-2 mt-7 lg:mt-14">
            <div>
                <div className="mb-10">
                    <Title className="mb-[6px]">
                        Contact Information
                    </Title>
                    <Paragraph>
                        Fill out the form below to send us a message.
                    </Paragraph>
                </div>
              <ul className="flex flex-col gap-5 lg:gap-10">
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <Mail className="text-blue" />
                  <div >
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">Email address</h4>
                    <p className="text-[#353535] text-sm font-inter font-normal">+880 1234 567890</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <Phone className="text-blue"/>
                  <div >
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">Phone</h4>
                    <p className="text-[#353535] text-sm font-inter font-normal">+880 1234 567890</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <MapPin className="text-blue"/>
                  <div >
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">Office Address</h4>
                    <p className="text-[#353535] text-sm font-inter font-normal w-full lg:w-1/2">Humanity & Inclusion Cox&apos;s Bazar Field Office Road #3, Block #B Cox&apos;s Bazar, Bangladesh</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 font-poppins font-medium text-[#353535] mb-4">
                  <Clock4 className="text-blue"/>
                  <div >
                    <h4 className="leading-none text-blue font-semibold font-inter text-base mb-[6px]">Office Address</h4>
                    <p className="text-[#353535] text-sm font-inter font-normal">Sunday - Thursday: 9:00 AM - 5:00 PM <br/>Friday - Saturday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
                <div className="mb-10">
                    <Title className="mb-[6px]">
                        Get in Touch
                    </Title>
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
