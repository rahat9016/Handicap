import SectionTopTitle from "@/components/share/SectionTopTitle";

export default function WhoWeServe() {
  return (
    <div>
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle title="Who We Serve" />
          <ul className="w-1/2 mx-auto space-y-2 text-sm text-white/80 pt-10">
            {[
              "Persons with disabilities and their families",
              "Humanitarian and development practitioners",
              "Organizations of persons with disabilities and Community Based Organizations",
              "Policymakers seeking evidence based guidance and resources",
              "Students, researchers, and volunteers seeking learning, research, or training opportunities",
              "The broader public interested in disability inclusion",
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
  );
}
