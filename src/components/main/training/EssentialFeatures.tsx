import SectionTopTitle from "@/components/share/SectionTopTitle";

const essentialData = [
  {
    title: "DFAT",
    type: "Stake Holder 01",
    typeColor: "green",
    description:
      "Australian Department of Foreign Affairs and Trade Primary donor supporting disability-inclusive development and humanitarian action in the region.",
  },
  {
    title: "ISCG",
    type: "Stake Holder 02",
    typeColor: "cyan",
    description:
      "Inter Sector Coordination Group Coordinates the overall humanitarian response in Cox's Bazar, ensuring inclusion is mainstreamed across sectors.",
  },
  {
    title: "ADTWG",
    type: "Stake Holder 03",
    typeColor: "yellow",
    description:
      "Age and Disability Technical Working Group Provides technical support on age and disability inclusion to humanitarian organizations in Cox's Bazar.",
  },
];
const colorClasses: Record<string, string> = {
  green: "bg-[#22C55E14] text-[#22C55E] border border-[#22C55E66]",
  blue: "bg-[#4F46E514] text-[#BBB7FF] border border-[#4F46E566]",
  yellow: "bg-[#EAB30814] text-[#65A30D] border border-[#65A30D66]",
  cyan: "bg-[#06B6D414] text-[#06B6D4] border border-[#06B6D466]",
};
export default function EssentialFeatures() {
  return (
    <div>
      <div className="container">
        <div className="py-10 lg:py-20 lg:pt  -[120px]">
          <SectionTopTitle
            title="Essential Features"
            desc="The Disability Inclusion Resource Hub offers a range of essential features designed to enhance user experience and promote inclusive access. These include multilingual content, downloadable tools, accessible formats."
          />
          <div className="w-full lg:w-9/12 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 lg:mt-20">
            {essentialData.map((res, idx) => (
              <div
                key={idx}
                className="bg-[#F3F3F4] border border-[#AFC4FF] group hover:bg-primary p-8 rounded-2xl"
              >
                <p
                  className={`w-fit max-w-[150px] text-xs font-medium px-2 py-1 rounded-full ${
                    colorClasses[res.typeColor]
                  }`}
                >
                  {res.type}
                </p>
                <h3 className="text-lg font-semibold text-primary group-hover:text-white mt-6">
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
    </div>
  );
}
