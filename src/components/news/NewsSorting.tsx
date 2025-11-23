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
  setNewsCategories,
  setNewsTags,
  setSortBy,
} from "@/lib/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ICategory } from "../UserDashboard/MyCourse/types/traning";


const sortOptions = [
  { label: "Most View", value: "viewCount:desc" },
  { label: "Oldest First", value: "createdAt:desc" },
];

const NewsSorting = () => {
  const dispatch = useAppDispatch();

  const { data: newsCategories, isLoading: isNewsCategoriesLoading } = useGet<
    ICategory[]
  >("/news-category?isActive=true", ["news-category"]);

  // const { data: newsTags, isLoading: isNewsTagsLoading } = useGet<INewsTags[]>(
  //   "/news-tag?isActive=true",
  //   ["news-tag"]
  // );

  const methods = useForm({
    defaultValues: {
      sortBy: [],
      newsCategories: [],
      newsTags: [],
    },
  });
  console.log(methods.watch("sortBy"));
  useEffect(() => {
    const subscription = methods.watch((values) => {
      dispatch(setSortBy(values.sortBy));
      dispatch(setNewsTags(values.newsTags));
      dispatch(setNewsCategories(values.newsCategories));
    });
    return () => subscription.unsubscribe();
  }, [methods, dispatch]);

  const NewsCategoryOptions = mapToSelectOptions(
    newsCategories?.data,
    "name",
    "id"
  );
  // const newsTagOptions = mapToSelectOptions(newsTags?.data, "name", "id");
  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-8 text-sm">
          <Accordion
            type="multiple"
            defaultValue={["sort", "level", "newsCategories"]}
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
            {/* <AccordionItem value="level" className="border-b-0">
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
                    name="newsTags"
                    options={newsTagOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem> */}

            {/* ── Resource Type ─────────────────────────────── */}
            <AccordionItem value="newsCategories" className="border-b-0">
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
                    name="newsCategories"
                    options={NewsCategoryOptions}
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
