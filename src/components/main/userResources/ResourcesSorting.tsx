"use client";
import { IKeywords } from "@/components/dashboard/resources/ResourceKeywords/types/Keywords";
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
  setKeywords,
  setLanguages,
  setResourceTypes,
  setSortBy,
} from "@/lib/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const sortOptions = [
  { label: "Low to High Downloads", value: "downloadCount:asc" },
  { label: "High to low Downloads", value: "downloadCount:desc" },
  { label: "Less View", value: "viewCount:asc" },
  { label: "More View", value: "viewCount:desc" },
  { label: "Oldest First", value: "oldest" },
  { label: "Created At", value: "createdAt:desc" },
];

export default function ResourcesSorting() {
  const dispatch = useAppDispatch();

  const { data: resourceData, isLoading: isResourceLoading } = useGet<
    IResource[]
  >("/resource-categories", ["resource-categories"]);
  const { data: keywordsData, isLoading: isResourceKeywords } = useGet<
    IKeywords[]
  >("/resource-keywords", ["resource-keywords"]);

  const { data: languagesData, isLoading: isLanguagesLoading } = useGet<
    ILanguage[]
  >("/languages", ["languages"]);

  const methods = useForm({
    defaultValues: {
      sortBy: [],
      resourceTypes: [],
      languages: [],
      keywords:[]
    },
  });

  useEffect(() => {
    const subscription = methods.watch((values) => {
      dispatch(setSortBy(values.sortBy));
      dispatch(setResourceTypes(values.resourceTypes));
      dispatch(setLanguages(values.languages));
      dispatch(setKeywords(values.keywords));
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
  const keywordOptions = mapToSelectOptions(
    keywordsData?.data,
    "name",
    "id"
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-8 text-sm">
          <Accordion
            type="multiple"
            defaultValue={["sort", "resourceType", "language", "keyword"]}
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
            <AccordionItem value="keyword" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-6">
                Keywords
              </AccordionTrigger>
              <AccordionContent>
                {isResourceKeywords ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="keywords"
                    options={keywordOptions}
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
