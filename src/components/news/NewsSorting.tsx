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
import { ICategory } from "../UserDashboard/MyCourse/types/traning";
import NewsCategories from "./NewsCategories/NewsCategories";

const sortOptions = [
  { label: "Most View", value: "viewCount:desc" },
  { label: "Oldest First", value: "createdAt:desc" },
];
const levelOptions = [
  { label: "Local", value: "LOCAL" },
  { label: "National", value: "NATIONAL" },
  { label: "International", value: "INTERNATIONAL" },
];

const organizationOptions = [
  { label: "Jayjay Din", value: "jayjay-din" },
  { label: "Daily Amar Desh", value: "daily-amar-desh" },
  { label: "Bangla Edition", value: "Bangla Edition" },
];
const NewsSorting = () => {
  const dispatch = useAppDispatch();

  const { data: newsCategories, isLoading: isNewsCategoriesLoading } = useGet<
    ICategory[]
  >("/news-category", ["news-category"]);

  const { data: newsTags, isLoading: isNewsTagsLoading } = useGet<
    IOrganization[]
  >("/news-tag", ["news-tag"]);

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

  const NewsCategoryOptions = mapToSelectOptions(
    newsCategories?.data,
    "name",
    "id"
  );
  const newsTagOptions = mapToSelectOptions(newsTags?.data, "name", "id");

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
            <AccordionItem value="sort" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-3">
                Sort by
              </AccordionTrigger>
              <AccordionContent>
                <ControlledCheckboxField name="sortBy" options={sortOptions} />
              </AccordionContent>
            </AccordionItem>
            {/* ── Level ─────────────────────────────────────── */}
            <AccordionItem value="level" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-3">
                News Tag
              </AccordionTrigger>
              <AccordionContent>
                {isNewsTagsLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-52" />
                  </div>
                ) : (
                  <ControlledCheckboxField
                    name="level"
                    options={newsTagOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            {/* ── Resource Type ─────────────────────────────── */}
            <AccordionItem value="courseCategory" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-3">
                News Category
              </AccordionTrigger>
              <AccordionContent>
                {isNewsCategoriesLoading ? (
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
                    options={NewsCategoryOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
            {/* ── Organization ─────────────────────────────── */}
            <AccordionItem value="organization" className="border-b-0">
              <AccordionTrigger className="font-bold hover:no-underline text-black text-sm border-b rounded-none mb-3">
                News Portals
              </AccordionTrigger>
              <AccordionContent>
                {isNewsTagsLoading ? (
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
};

export default NewsSorting;
