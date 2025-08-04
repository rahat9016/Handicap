"use client";
import ControlledCheckboxField from "@/components/share/ControlledCheckboxField";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FormProvider, useForm } from "react-hook-form";

const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Most Downloads", value: "downloads" },
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
];

const sectorOptions = [
  { label: "All Sectors", value: "all" },
  { label: "WASH", value: "wash" },
  { label: "Education", value: "education" },
  { label: "Protection", value: "protection" },
  { label: "Shelter", value: "shelter" },
  { label: "Nutrition", value: "nutrition" },
  { label: "Health", value: "health" },
  { label: "Caregivers", value: "care" },
  { label: "Inclusive DRR", value: "drr" },
];

const resourceTypeOptions = [
  { label: "All Resources", value: "all" },
  { label: "Guidelines", value: "guidelines" },
  { label: "Training", value: "training" },
  { label: "Research", value: "research" },
  { label: "Tools", value: "tools" },
  { label: "Infographics", value: "infographics" },
  { label: "PDF Documents", value: "pdf" },
  { label: "Word Documents", value: "doc" },
  { label: "Videos", value: "video" },
  { label: "Audio", value: "audio" },
];

const languageOptions = [
  { label: "All Languages", value: "all" },
  { label: "English", value: "en" },
  { label: "Bangla", value: "bn" },
];

export default function ResourcesSorting() {
  const methods = useForm();
  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-8 text-sm">
          <Accordion
            type="multiple"
            defaultValue={["sort", "sectors", "resourceType", "language"]}
            className="w-full space-y-5"
          >
            {/* ── Sort By (Radio) ──────────────────────────────────────────────── */}
            <AccordionItem value="sort" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-6">
                Sort by
              </AccordionTrigger>
              <AccordionContent>
                <ControlledCheckboxField name="sortBy" options={sortOptions} />
              </AccordionContent>
            </AccordionItem>

            {/* ── Sectors (Checkbox) ───────────────────────────────────────────── */}
            <AccordionItem value="sectors" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-6">
                Sector
              </AccordionTrigger>
              <AccordionContent>
                <ControlledCheckboxField name="sectors" options={sectorOptions} />
              </AccordionContent>
            </AccordionItem>

            {/* ── Resource Type (Checkbox) ─────────────────────────────────────── */}
            <AccordionItem value="resourceType" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-6">
                Resource Type
              </AccordionTrigger>
              <AccordionContent>
                <ControlledCheckboxField name="resourceTypes" options={resourceTypeOptions} />
              </AccordionContent>
            </AccordionItem>

            {/* ── Language (Checkbox) ──────────────────────────────────────────── */}
            <AccordionItem value="language" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-6">
                Language
              </AccordionTrigger>
              <AccordionContent>
                <ControlledCheckboxField name="languages" options={languageOptions} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </FormProvider>
    </div>
  );
}