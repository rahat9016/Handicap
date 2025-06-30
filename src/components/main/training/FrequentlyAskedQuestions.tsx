import FAQAccordion from "@/components/share/FAQAccordion";
import SectionTopTitle from "@/components/share/SectionTopTitle";

export default function FrequentlyAskedQuestions() {
  return (
    <div>
      <div className="container py-10 lg:py-20">
        <SectionTopTitle
          className="mb-14"
          classDesc="w-full lg:w-6/12"
          title="Frequently Asked Questions"
          desc="Find answers to common questions about the Disability Inclusion Resource Hub—covering how to access materials, who can benefit."
        />
        <div className="w-full lg:w-6/12 mx-auto">
            <FAQAccordion />
        </div>
      </div>
    </div>
  );
}
