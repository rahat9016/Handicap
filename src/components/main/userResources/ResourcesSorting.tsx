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
import { Button } from "@/components/ui/button";
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
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const sortOptions = [
  { label: "Most Downloads", value: "totalDownloadCount:desc" },
  { label: "Most View", value: "totalViewCount:desc" },
  { label: "Oldest First", value: "createdAt:desc" },
];

const ResourcesSorting = () => {
  const dispatch = useAppDispatch();

  const { data: resourceData, isLoading: isResourceLoading } = useGet<
    IResource[]
  >("/resource-categories?isActive=true", ["resource-categories"]);
  const { data: keywordsData, isLoading: isResourceKeywords } = useGet<
    IKeywords[]
  >("/resource-keywords?isActive=true", ["resource-keywords"]);

  const { data: languagesData, isLoading: isLanguagesLoading } = useGet<
    ILanguage[]
  >("/languages?isActive=true", ["languages"]);

  const methods = useForm({
    defaultValues: {
      sortBy: [],
      resourceTypes: [],
      languages: [],
      keywords: [],
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
  const keywordOptions = mapToSelectOptions(keywordsData?.data, "name", "id");

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form className="space-y-6 lg:space-y-8 text-sm">
          {/* Clear Button */}
          <div className="flex justify-end">
            <Button
              onClick={(e) => {
                e.preventDefault();
                methods.reset();
              }}
              className="border text-black hover:text-white flex items-center gap-2 bg-transparent hover:bg-dashboard-primary text-xs lg:text-sm"
              size="sm"
            >
              <Trash className="w-3 h-3 lg:w-4 lg:h-4" />
              Clear Filters
            </Button>
          </div>

          <Accordion
            type="multiple"
            defaultValue={["sort", "resourceType", "language", "keyword"]}
            className="w-full space-y-0"
          >
            {/* Sort By Section */}
            <AccordionItem value="sort" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm lg:text-base border-b rounded-none mb-3 px-0">
                Sort by
              </AccordionTrigger>
              <AccordionContent className="px-0">
                {isResourceLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 3 }, (_, i) => (
                      <Skeleton key={i} className="h-4 w-full max-w-52" />
                    ))}
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="sortBy"
                    options={sortOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Resource Type Section */}
            <AccordionItem value="resourceType" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm lg:text-base border-b rounded-none mb-3 px-0">
                Resource Sector
              </AccordionTrigger>
              <AccordionContent className="px-0 ">
                {isResourceLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 6 }, (_, i) => (
                      <Skeleton key={i} className="h-4 w-full max-w-52" />
                    ))}
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="resourceTypes"
                    options={resourceCategoryOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Language Section */}
            <AccordionItem value="language" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm lg:text-base border-b rounded-none mb-3 px-0">
                Language
              </AccordionTrigger>
              <AccordionContent className="px-0 max-h-32 lg:max-h-40 overflow-y-auto">
                {isLanguagesLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 3 }, (_, i) => (
                      <Skeleton key={i} className="h-4 w-full max-w-52" />
                    ))}
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="languages"
                    options={languagesCategoryOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Keywords Section */}
            <AccordionItem value="keyword" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm lg:text-base border-b rounded-none mb-3 px-0">
                Keywords
              </AccordionTrigger>
              <AccordionContent className="px-0 max-h-32 lg:max-h-40 overflow-y-auto">
                {isResourceKeywords ? (
                  <div className="space-y-2">
                    {Array.from({ length: 3 }, (_, i) => (
                      <Skeleton key={i} className="h-4 w-full max-w-52" />
                    ))}
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
};

export default ResourcesSorting;
