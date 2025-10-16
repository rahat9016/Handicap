import { IOrganization } from "@/components/organizer/types";
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
import { ICategory } from "./types/traning";

const sortOptions = [
  { label: "Most View", value: "viewCount:desc" },
  { label: "Oldest First", value: "createdAt:asc" },
];
const levelOptions = [
  { label: "Beginner", value: "BEGINNER" },
  { label: "Intermediate", value: "INTERMEDIATE" },
  { label: "Advanced", value: "ADVANCED" },
];

export default function TrainingSorting() {
  const dispatch = useAppDispatch();
  const { data: courseCategoryData, isLoading: isResourceLoading } = useGet<
    ICategory[]
  >("/course-category?isActive=true", ["course-category"]);
  const { data: organizationData, isLoading: isOrganizationLoading } = useGet<
    IOrganization[]
  >("/organizations?isActive=true", ["organizations"]);

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

  const resourceCategoryOptions = mapToSelectOptions(
    courseCategoryData?.data,
    "name",
    "id"
  );
  const organizationOptions = mapToSelectOptions(
    organizationData?.data,
    "name",
    "id"
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-6 text-sm">
          <Accordion
            type="multiple"
            defaultValue={["sort", "courseCategory", "level", "organization"]}
            className="w-full space-y-0"
          >
            {/* Clear button */}
            <div className="flex justify-end mb-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  methods.reset();
                  dispatch(setSortBy([]));
                  dispatch(setCourseCategories([]));
                  dispatch(setLevel([]));
                  dispatch(setOrganizationIds([]));
                }}
                className="border text-black hover:text-white flex items-center gap-2 bg-transparent hover:bg-dashboard-primary"
              >
                <Trash className="w-4 h-4" />
                Clear
              </Button>
            </div>

            {/* Sort */}
            <AccordionItem value="sort">
              <AccordionTrigger className="font-bold text-black text-sm border-b mb-3">
                Sort by
              </AccordionTrigger>
              <AccordionContent>
                {isResourceLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-52" />
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

            {/* Levels */}
            <AccordionItem value="level">
              <AccordionTrigger className="font-bold text-black text-sm border-b mb-3">
                Levels
              </AccordionTrigger>
              <AccordionContent>
                {isResourceLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-52" />
                    ))}
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="level"
                    options={levelOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Course Category */}
            <AccordionItem value="courseCategory">
              <AccordionTrigger className="font-bold text-black text-sm border-b mb-3">
                Course Category
              </AccordionTrigger>
              <AccordionContent>
                {isResourceLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-52" />
                    ))}
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="courseTypes"
                    options={resourceCategoryOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Organization */}
            <AccordionItem value="organization">
              <AccordionTrigger className="font-bold text-black text-sm border-b mb-3">
                Organization
              </AccordionTrigger>
              <AccordionContent>
                {isOrganizationLoading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-52" />
                    ))}
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="organizationIds"
                    options={organizationOptions}
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
