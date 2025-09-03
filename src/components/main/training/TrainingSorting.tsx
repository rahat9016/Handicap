import ControlledCheckboxField from "@/components/share/ControlledCheckboxField";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGet } from "@/hooks/useGet";
import { setCourseCategories, setSortBy } from "@/lib/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ICategory } from "./types/traning";

const sortOptions = [
  { label: "Most Downloads", value: "totalDownloadCount:desc" },
  { label: "Most View", value: "viewCount:desc" },
  { label: "Oldest First", value: "createdAt:desc" },
];

export default function TrainingSorting() {
  const dispatch = useAppDispatch();
  const { data: courseCategoryData, isLoading: isResourceLoading } = useGet<
    ICategory[]
  >("/course-category", ["course-category"]);

  const methods = useForm({
    defaultValues: {
      sortBy: [],
      courseTypes: []
    },
  });

  useEffect(() => {
    const subscription = methods.watch((values) => {
      dispatch(setSortBy(values.sortBy));
      dispatch(setCourseCategories(values.courseTypes));
    });
    return () => subscription.unsubscribe();
  }, [methods, dispatch]);

  const resourceCategoryOptions = mapToSelectOptions(
    courseCategoryData?.data,
    "name",
    "id"
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-8 text-sm">
          <Accordion
            type="multiple"
            defaultValue={["sort", "courseCategory", "language", "keyword"]}
            className="w-full space-y-0"
          >
            <Button
              onClick={(e) => {
                e.preventDefault();
                methods.reset();
              }}
              className="border text-black hover:text-white flex items-center bg-transparent hover:bg-dashboard-primary ml-auto"
            >
              <Trash />
              Clear
            </Button>
            {/* ── Sort By ───────────────────────────────────── */}
            <AccordionItem value="sort" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-3">
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
            <AccordionItem value="courseCategory" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-3">
                Course Category
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
                    name="courseTypes"
                    options={resourceCategoryOptions}
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