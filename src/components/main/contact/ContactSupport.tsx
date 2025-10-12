"use client";
import Paragraph from "@/components/share/Paragraph";
import SectionTopTitle from "@/components/share/SectionTopTitle";
import Title from "@/components/share/Title";
import { useGet } from "@/hooks/useGet";
import { IContactInfo } from "@/types/types";
import { CapFirst } from "@/utils/CapFirst";
import { Clock4, Mail, MapPin, Phone, User } from "lucide-react";
import ContactForm from "./ContactForm";

const ContactSupport = () => {
  const { data } = useGet<IContactInfo>("/contact-information", [
    "contact-info",
  ]);
  const ContactData = data?.data;
  console.log(ContactData?.contacts);

  return (
    <div>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12 lg:py-16 xl:py-20">
          <SectionTopTitle
            title="Contact Us"
            desc="We welcome your questions, feedback, and suggestions. Please feel free to reach out to us through the following channels."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 mt-6 lg:mt-10 xl:mt-14">
            <div className="order-2 lg:order-1">
              <div className="mb-6 lg:mb-8 xl:mb-10">
                <Title className="mb-2 lg:mb-[6px] text-xl lg:text-2xl">
                  Contact Information
                </Title>
              </div>

              <ul className="flex flex-col gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <User className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Name
                    </h4>
                    <div className="space-y-4">
                      {ContactData?.contacts?.map((contact, index) => (
                        <div key={index}>
                          <p className="text-[#353535] text-sm lg:text-base font-inter font-normal">
                            {contact?.name}
                          </p>
                          <p className="text-[#353535] text-xs lg:text-sm font-inter font-normal mt-1">
                            <b>Designation:</b> {contact?.designation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <Mail className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Email address
                    </h4>
                    {ContactData?.emails?.map((email, index) => (
                      <p
                        key={index}
                        className="text-[#353535] text-sm lg:text-base font-inter font-normal"
                      >
                        <span className="font-semibold text-sm">
                          {CapFirst(email.type)}:{" "}
                        </span>
                        {email?.email}
                      </p>
                    ))}
                  </div>
                </li>

                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <Phone className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Phone
                    </h4>
                    {ContactData?.phones?.map((item, index) => (
                      <p
                        key={index}
                        className="text-[#353535] text-sm lg:text-base font-inter font-normal"
                      >
                        <span className="font-semibold text-sm">
                          {CapFirst(item?.type)}:{" "}
                        </span>
                        {item?.phone}
                      </p>
                    ))}
                  </div>
                </li>

                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <MapPin className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Office Address
                    </h4>
                    {ContactData?.addresses?.map((item, index) => (
                      <p
                        key={index}
                        className="text-[#353535] text-sm lg:text-base font-inter font-normal w-full lg:w-10/12 xl:w-3/4"
                      >
                        <span className="font-semibold text-sm">
                          {CapFirst(item.type)}:{" "}
                        </span>
                        {item?.address}
                      </p>
                    ))}
                  </div>
                </li>

                <li className="flex items-start gap-3 font-poppins font-medium text-[#353535]">
                  <Clock4 className="text-blue w-5 h-5 lg:w-6 lg:h-6 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="leading-none text-blue font-semibold font-inter text-base lg:text-lg mb-1 lg:mb-[6px]">
                      Office Time
                    </h4>
                    <p className="text-[#353535] text-sm lg:text-base font-inter font-normal">
                      {ContactData?.officeHours}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Form Section */}
            <div className="order-1 lg:order-2">
              <div className="mb-6 lg:mb-8 xl:mb-10">
                <Title className="mb-2 lg:mb-[6px] text-xl lg:text-2xl">
                  Get in Touch
                </Title>
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
