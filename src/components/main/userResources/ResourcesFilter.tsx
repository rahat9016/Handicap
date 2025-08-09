import SectionTopTitle from "@/components/share/SectionTopTitle";
import ResourceLibrary from "./ResourceLibrary";
import ResourcesSorting from "./ResourcesSorting";


export default function ResourcesFilter() {
  return (
    <div>
      <div className="container py-10 lg:py-20">
        <SectionTopTitle
          title="Resource Library"
          desc="Access our comprehensive collection of disability inclusion resources, including guidelines, training materials, research reports, and tools."
        />
        <div className="flex items-start gap-28 mt-14">
          <div className="w-2/12">
            <ResourcesSorting />
          </div>
          <div className="w-10/12">
            <ResourceLibrary />
          </div>
        </div>
      </div>
    </div>
  );
}