import SectionTopTitle from "@/components/share/SectionTopTitle";

export default function AboutUs() {
  return (
    <div>
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="About Us"
            desc="The Disability Inclusion Resource Hub is a platform dedicated to promoting disability inclusion across humanitarian and development sectors. Funded by the Australian Department of Foreign Affairs and Trade (DFAT) and supported by Humanity & Inclusion and the Age and Disability Technical Working Group (ADTWG) under the ISCG, the hub brings together guidelines, tools, research, and training materials to build capacity, provide reference, support inclusive practices, and ensure the meaningful participation of persons with disabilities. By centralizing these resources, the hub enables organizations and communities to strengthen disability-inclusive programming and promote equity in emergency and development responses."
            classTitle="text-left w-9/12 mx-auto" 
            classDesc="text-left lg:w-9/12"
          />
          <div className="w-full lg:w-9/12 mx-auto mt-10 lg:mt-20">
            <h3 className="text-primary text-lg font-inter font-medium">
              Our Mission
            </h3>
            <p className="text-[#7A7A8E] text-sm font-inter font-normal mt-3 ">
              A humanitarian and development environment where persons with disabilities are fully included, empowered, and have full access to participation in programs, services, and decision-making processes.
            </p>
            <h3 className="text-primary text-lg font-inter font-medium mt-5 lg:mt-10">
              Our Vision
            </h3>
            <p className="text-[#7A7A8E] text-sm font-inter font-normal mt-3">
              To provide accessible resources, practical tools, web based training, and guidance on disability inclusion, empowering organizations, communities, individuals, and relevant stakeholders to build capacity, implement inclusive practices, raise awareness, and advocate effectively for the rights of persons with disabilities in humanitarian and development contexts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
