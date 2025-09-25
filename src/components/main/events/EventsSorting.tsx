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
  setCourseCategories,
  setLevel,
  setOrganizationIds,
  setSortBy,
} from "@/lib/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ICategory, ITag } from "../training/types/traning";

// const sortOptions = [
//   { label: "Most View", value: "viewCount:desc" },
//   { label: "Oldest First", value: "createdAt:desc" },
// ];
// const tags = [
//   { label: "Beginner", value: "BEGINNER" },
//   { label: "Intermediate", value: "INTERMEDIATE" },
//   { label: "Advanced", value: "ADVANCED" },
// ];

const EventsSorting = () => {
  const dispatch = useAppDispatch();

  const { data: eventTags, isLoading: isTagsLoading } = useGet<ITag[]>(
    "/event-tags",
    ["event-tags"]
  );

  const { data: eventCategories, isLoading: isEventCategoriesLoading } = useGet<
    ICategory[]
  >("/event-categories", ["event-categories"]);

  console.log(eventCategories, eventTags);

  const methods = useForm({
    defaultValues: {
      sortBy: [],
      courseTypes: [],
      level: [],
      organizationIds: [],
    },
  });

  useEffect(() => {
    const subscription = methods.watch((values) => {
      dispatch(setSortBy(values.sortBy));
      dispatch(setCourseCategories(values.courseTypes));
      dispatch(setLevel(values.level));
      dispatch(setOrganizationIds(values.organizationIds));
    });
    return () => subscription.unsubscribe();
  }, [methods, dispatch]);

  const categoryOptions = mapToSelectOptions(
    eventCategories?.data,
    "name",
    "id"
  );
  const tagOptions = mapToSelectOptions(eventTags?.data, "name", "id");

  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-8 text-sm">
          <Accordion
            type="multiple"
            defaultValue={["sort", "courseCategory", "level", "organization"]}
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
            {/* <AccordionItem value="sort" className="border-b-0">
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
            </AccordionItem> */}
            {/* ── Level ─────────────────────────────────────── */}
            <AccordionItem value="level" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-3">
                Event Tags
              </AccordionTrigger>
              <AccordionContent>
                {isTagsLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                  </div>
                ) : (
                  <ControlledCheckboxField name="tags" options={tagOptions} />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* ── Resource Type ─────────────────────────────── */}
            <AccordionItem value="courseCategory" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-3">
                Event Category
              </AccordionTrigger>
              <AccordionContent>
                {isEventCategoriesLoading ? (
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
                    options={categoryOptions}
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

export default EventsSorting;
