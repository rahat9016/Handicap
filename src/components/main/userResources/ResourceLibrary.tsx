import { IResource } from "@/components/dashboard/resources/types/types";
import { useAppSelector } from "@/lib/redux/hooks";
import ResourceCard from "./ResourceCard";

export default function ResourceLibrary({
  resources,
}: {
  resources: IResource[];
}) {
  const { userInformation:{id} } = useAppSelector(state => state.auth)
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {resources?.map((resource, index) => {
          return (
            <ResourceCard
              id={resource.id}
              key={index}
              title={resource.title}
              description={resource.description}
              imageUrl={resource.filePath}
              date={resource.createdAt}
              size={resource.fileSize}
              ratings={3.2}
              isFeatured
              isPdf
              fileType={resource.fileType}
              filePath={resource.filePath}
              downloadCount={resource.downloadCount}
              isPrivate={resource.isPrivate && !!id}
              
            />
          );
        })}
      </div>
    </div>
  );
}
