import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { data } from "./data";

export default function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {data?.map((content, index) => {
        return (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className="mb-3 border-[0px]"
          >
            <AccordionTrigger className="p-4 rounded-lg text-primary text-sm lg:text-base font-medium font-inter border-b">
              {content.title}
            </AccordionTrigger>
            <AccordionContent className="bg- mt-1 py-2 lg:py-4 px-3 lg:px-6 pb-6 lg:pb-14 rounded-lg border-b border-[#B7B7B7]">
              {content.desc1 && (
                <p className="text-sm font-inter text-[#8F8F8F] font-normal mb-3 lg:mb-6">
                  {content.desc1}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
