"use client";
import { IResource } from "@/components/dashboard/resources/types/types";
import { ILanguage } from "@/components/dashboard/setup/types/setup";
import ControlledCheckboxField from "@/components/share/ControlledCheckboxField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useGet";
import {
  setLanguages,
  setResourceTypes,
  setSortBy,
} from "@/lib/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const sortOptions = [
  { label: "Most Downloads", value: "downloadCount" },
  { label: "Newest First", value: "viewCount" },
  { label: "Oldest First", value: "oldest" },
];

export default function ResourcesSorting() {
  const dispatch = useAppDispatch();

  const { data: resourceData, isLoading: isResourceLoading } = useGet<
    IResource[]
  >("/resource-categories", ["resource-categories"]);

  const { data: languagesData, isLoading: isLanguagesLoading } = useGet<
    ILanguage[]
  >("/languages", ["languages"]);

  const methods = useForm({
    defaultValues: {
      sortBy: [],
      resourceTypes: [],
      languages: [],
    },
  });

  useEffect(() => {
    const subscription = methods.watch((values) => {
      dispatch(setSortBy(values.sortBy));
      dispatch(setResourceTypes(values.resourceTypes));
      dispatch(setLanguages(values.languages));
    });
    return () => subscription.unsubscribe();
  }, [methods, dispatch]);

  const resourceCategoryOptions = mapToSelectOptions(
    resourceData?.data,
    "name",
    "id"
  );
  const languagesCategoryOptions = mapToSelectOptions(
    languagesData?.data,
    "name",
    "id"
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-8 text-sm">
          <Accordion
            type="multiple"
            defaultValue={["sort", "resourceType", "language"]}
            className="w-full space-y-5"
          >
            {/* ── Sort By ───────────────────────────────────── */}
            <AccordionItem value="sort" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-6">
                Sort by
              </AccordionTrigger>
              <AccordionContent>
                {isResourceLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="sortBy"
                    options={sortOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* ── Resource Type ─────────────────────────────── */}
            <AccordionItem value="resourceType" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-6">
                Resource Type
              </AccordionTrigger>
              <AccordionContent>
                {isResourceLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="resourceTypes"
                    options={resourceCategoryOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* ── Language ─────────────────────────────────── */}
            <AccordionItem value="language" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-6">
                Language
              </AccordionTrigger>
              <AccordionContent>
                {isLanguagesLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="languages"
                    options={languagesCategoryOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </FormProvider>
    </div>
  );
}
