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
  setEventCategories,
  setEventTags,
} from "@/lib/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { mapToSelectOptions } from "@/utils/mapToSelectOptions";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ICategory } from "../training/types/traning";

const EventsSorting = () => {
  const dispatch = useAppDispatch();

  // const { data: eventTags, isLoading: isTagsLoading } = useGet<ITag[]>(
  //   "/event-tags?isActive=true",
  //   ["event-tags"]
  // );

  const { data: eventCategories, isLoading: isEventCategoriesLoading } = useGet<
    ICategory[]
  >("/event-categories?isActive=true", ["event-categories"]);

  const methods = useForm({
    defaultValues: {
      eventTags: [],
      eventCategories: [],
    },
  });

  useEffect(() => {
    const subscription = methods.watch((values) => {
      dispatch(setEventTags(values.eventTags));
      dispatch(setEventCategories(values.eventCategories));
    });
    return () => subscription.unsubscribe();
  }, [methods, dispatch]);

  const categoryOptions = mapToSelectOptions(
    eventCategories?.data,
    "name",
    "id"
  );
  // const tagOptions = mapToSelectOptions(eventTags?.data, "name", "id");

  return (
    <div>
      <FormProvider {...methods}>
        <form className="space-y-4 lg:space-y-4 text-sm">
          <Accordion
            type="multiple"
            defaultValue={[ "eventCategories"]}
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

            {/* <AccordionItem value="eventTags" className="border-b-0">
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
                  <ControlledCheckboxField
                    name="eventTags"
                    options={tagOptions}
                  />
                )}
              </AccordionContent>
            </AccordionItem> */}

            {/* ── Resource Type ─────────────────────────────── */}
            <AccordionItem value="eventCategories" className="border-b-0">
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
                    name="eventCategories"
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
