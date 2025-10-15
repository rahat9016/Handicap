"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGet } from "@/hooks/useGet";
import { ILangType } from "@/types";
import { useLocale } from "next-intl";
import { IFaq } from "../dashboard/faqs/types";

export default function FAQAccordion() {
  const { data } = useGet<IFaq[]>("/faqs", ["faqs"]);
  const FAQData = data?.data || [];
  const local = useLocale() as "en" | "bn";
  console.log(FAQData);
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQData.map(
        (
          faq: { id: string | number; question: ILangType; answer: ILangType },
          index: number
        ) => {
          return (
            <AccordionItem
              key={faq.id}
              value={`item-${index + 1}`}
              className="mb-3 border-[0px]"
            >
              <AccordionTrigger className="p-4 rounded-lg text-primary text-sm lg:text-base font-medium font-inter border-b">
                {faq.question[local] ?? faq.question.en}
              </AccordionTrigger>
              <AccordionContent className="bg- mt-1 py-2 lg:py-4 px-3 lg:px-6 pb-6 lg:pb-14 rounded-lg border-b border-[#B7B7B7]">
                {faq.answer && (
                  <p className="text-sm font-inter text-[#8F8F8F] font-normal mb-3 lg:mb-6">
                    {faq.answer[local] ?? faq.answer.en}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        }
      )}
    </Accordion>
  );
}
