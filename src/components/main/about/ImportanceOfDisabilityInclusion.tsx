import SectionTopTitle from "@/components/share/SectionTopTitle";
const resources = [
  {
    title: "15%",
    description:
      "of the world's population lives with some form of disability, according to the World Health Organization.",
  },
  {
    title: "Up to 22%",
    description:
      "of the refugee population in Cox's Bazar has a disability, higher than the global average.",
  },
  {
    title: "5,000+",
    description:
      "Partnered with local schools to support inclusive classrooms and train 100+ teachers nationwide.",
  },
];
export default function ImportanceOfDisabilityInclusion() {
  return (
    <div className="bg-[#F9F9FA]">
          <div className="container">
            <div className="py-10 lg:py-20">
              <SectionTopTitle
                title="Importance of Disability Inclusion"
                desc="The Disability Inclusion Resource Hub is funded by the Australian Department of Foreign Affairs and Trade (DFAT) as part of its commitment to disability-inclusive development. "
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-10 lg:mt-20">
                {resources.map((res, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F3F3F4] border border-[#AFC4FF] group hover:bg-primary p-8 rounded-2xl"
                  >
                    <h3 className="text-lg font-semibold text-primary group-hover:text-white">
                      {res.title}
                    </h3>
                    <p className="text-sm font-normal text-[#666666] group-hover:text-white mb-0 mt-3">
                  {res.description}
                </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  )
}
