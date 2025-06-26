import SectionTopTitle from "@/components/share/SectionTopTitle";

export default function AboutUs() {
  return (
    <div>
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="About Us"
            desc="We’re glad to see you again. Please sign in to continue using your account, manage your services, or stay updated with our latest initiatives."
          />
          <div className="w-full lg:w-9/12 mx-auto mt-10 lg:mt-20">
            <h3 className="text-primary text-lg font-inter font-medium">
              Our Mission
            </h3>
            <p className="text-[#7A7A8E] text-sm font-inter font-normal mt-3">
              Humanity & Inclusion (HI) is an independent and impartial aid
              organization working in situations of poverty and exclusion,
              conflict and disaster. We work alongside people with disabilities
              and vulnerable populations, taking action and bearing witness in
              order to respond to their essential needs, improve their living
              conditions and promote respect for their dignity and fundamental
              rights.
            </p>
            <p className="text-[#7A7A8E] text-sm font-inter font-normal mt-3">
              Since 2017, HI has been working in Cox&apos;s Bazar, Bangladesh, to support Rohingya refugees and host communities, with a particular focus on ensuring that persons with disabilities have access to humanitarian services and are included in the response.
            </p>
            <h3 className="text-primary text-lg font-inter font-medium mt-5 lg:mt-10">
              Our Work in Cox&apos;s Bazar
            </h3>
            <p className="text-[#7A7A8E] text-sm font-inter font-normal mt-3">
              In Cox&apos;s Bazar, HI provides direct services to persons with disabilities, including rehabilitation, psychosocial support, and assistive devices. We also work with humanitarian organizations to build their capacity to include persons with disabilities in their programs and services.

            </p>
            <p className="text-[#7A7A8E] text-sm font-inter font-normal mt-3">
              Through our technical support and coordination role in the Age and Disability Technical Working Group (ADTWG), we have developed numerous resources, guidelines, and training materials to support disability inclusion in the humanitarian response.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
