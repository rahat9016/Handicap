import { IResource } from "@/components/dashboard/resources/types/types";
import { useAppSelector } from "@/lib/redux/hooks";
import { useLocale } from "next-intl";
import ResourceCard from "./ResourceCard";

export default function ResourceLibrary({
  resources,
  refetch,
}: {
  resources: IResource[];
  refetch: () => void;
  viewMode?: "grid" | "list";
}) {
  const local = useLocale() as "en" | "bn";
  const {
    userInformation: { id },
  } = useAppSelector((state) => state.auth);

  return (
    <div>
      {resources.length === 0 ? (
        <div className="h-[100vh] flex flex-col items-center justify-center bg-slate-50 rounded-sm">
          <h1 className="font-inter text-xl text-black">
            Resource data not available{" "}
          </h1>
          <p className="text-sm font-inter">
            Please select right resource type
          </p>
        </div>
      ) : (
        <div
          className={
            `pb-4 flex flex-col gap-y-4`
          }
        >
          {resources?.map((resource, index) => {
            return (
              <ResourceCard
                id={resource.id}
                key={index}
                title={resource?.title?.[local] ?? resource?.title?.en ?? ""}
                description={
                  resource?.description?.[local] ??
                  resource?.description?.en ??
                  ""
                }
                imageUrl={resource.filePath}
                date={resource.createdAt}
                size={resource.fileSize}
                ratings={3.2}
                isFeatured
                isPdf
                fileType={resource?.resourceFiles[0]?.fileType}
                filePath={resource?.resourceFiles[0]?.filePath}
                downloadCount={resource.totalDownloadCount}
                viewCount={resource.totalViewCount}
                isPrivate={resource.isPrivate && !!id}
                organizerName={resource.organization.name}
                refetch={refetch}
                filesCount={resource.filesCount}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
