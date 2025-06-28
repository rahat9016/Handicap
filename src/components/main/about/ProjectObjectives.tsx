import SectionTopTitle from "@/components/share/SectionTopTitle";

export default function ProjectObjectives() {
  return (
    <div className="relative w-full ">
      <div
        className="container bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/about/ProjectObjectivesBg.png')`,
        }}
      >
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            classTitle="text-primary"
            classDesc="text-[#8F8F8F]"
            title="Project Objectives"
            desc="The Disability Inclusion Resource Hub is funded by the Australian Department of Foreign Affairs and Trade (DFAT) as part of its commitment to disability-inclusive development. The project aims to:"
          />
          <div className="w-full lg:w-7/12 mx-auto mt-[60px]">
            <ul className="space-y-2 text-sm text-white/80">
              {[
                "Centralize disability inclusion resources developed over six years of humanitarian response",
                "Provide accessible training materials for humanitarian actors",
                "Build capacity of humanitarian organizations to implement inclusive practices",
                "Ensure sustainability of disability inclusion efforts through knowledge management",
                "Support the implementation of the IASC Guidelines on Inclusion of Persons with disabilities in Humanitarian Action",
              ].map((linkText, i) => (
                <li key={i} className="text-primary text-base font-inter font-medium text-center">
                  <p>
                    {linkText}
                    <span className="block w-full h-[1px] bg-[#B7B7B7] mt-6"></span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
