"use client";
import ControlledCheckboxField from "@/components/share/ControlledCheckboxField";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FormProvider, useForm } from "react-hook-form";

const TypeOfCoursesOptions = [
  { label: "All Courses", value: "AllCourses" },
  { label: "Featured", value: "Featured" },
  { label: "Most Popular", value: "MostPopular" },
  { label: "Newest", value: "Newest" },
];

const levelOptions = [
  { label: "All Levels", value: "AllLevels" },
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

const CategoryTypeOptions = [
  { label: "All Categories", value: "all" },
  { label: "Foundation", value: "Foundation" },
  { label: "Sector-Specific", value: "Sector-Specific" },
  { label: "Technical", value: "Technical" }
];

export default function CoursesFilter() {
  const methods = useForm();
  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-8 text-sm">
          <Accordion
            type="multiple"
            defaultValue={["TypeOfCourses", "Level", "Category",]}
            className="w-full space-y-5"
          >
            {/* ── Type of Courses By (Radio) ──────────────────────────────────────────────── */}
            <AccordionItem value="TypeOfCourses" className="bg-white rounded-2xl p-6 shadow-none">
              <AccordionTrigger className="font-bold hover:no-underline text-[#1A40AE] text-lg rounded-none py-0 mb-6">
                Type of Courses
              </AccordionTrigger>
              <AccordionContent>
                <ControlledCheckboxField name="TypeOfCourses" options={TypeOfCoursesOptions} />
              </AccordionContent>
            </AccordionItem>

            {/* ── Sectors (Checkbox) ───────────────────────────────────────────── */}
            <AccordionItem value="Level" className="bg-white rounded-2xl p-6 shadow-none">
              <AccordionTrigger className="font-bold hover:no-underline text-[#1A40AE] text-lg rounded-none py-0 mb-6">
                Level
              </AccordionTrigger>
              <AccordionContent>
                <ControlledCheckboxField name="Level" options={levelOptions} />
              </AccordionContent>
            </AccordionItem>

            {/* ── Course Type (Checkbox) ─────────────────────────────────────── */}
            <AccordionItem value="Category" className="bg-white rounded-2xl p-6 shadow-none">
              <AccordionTrigger className="font-bold hover:no-underline text-[#1A40AE] text-lg rounded-none py-0 mb-6">
                Category
              </AccordionTrigger>
              <AccordionContent>
                <ControlledCheckboxField name="Level" options={CategoryTypeOptions} />
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </form>
      </FormProvider>
    </div>
  );
}
