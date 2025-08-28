import ResourceDetailSkeleton from "@/app/[locale]/(main)/resources/[id]/ResourceDetailSkeleton";
import ResourceHeaderDetails from "@/components/common/ResourceDetails/ResourceHeaderDetails";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { useRouter } from "@/i18n/navigation";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IResource } from "../types/types";
import { IResourceUpdate } from "./types";
import UpdateResourceFiles from "./UpdateResourceFiles";
import UpdateResources from "./UpdateResources";

export default function AdminResourceDetails() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [resource, setResource] = useState<IResourceUpdate | undefined>(
    undefined
  );
  const router = useRouter();
  const params = useParams();
  const resourceId = params.id as string;
  const { data, isLoading } = useGet<IResource>(`/resources/${resourceId}`, [
    "resources",
    resourceId,
  ]);
  const resourceData = data?.data;

  const handleEdit = () => {
    const editData = {
      id: resourceData?.id,
      title: resourceData?.title,
      description: resourceData?.description,
      organization: resourceData?.organization?.id,
      isPrivate: resourceData?.isPrivate,
      languageId: resourceData?.language?.id,
      categoryId: resourceData?.category?.id,
      keywordIds: resourceData?.keywords
        ?.filter((k) => k.keyword)
        .map((k) => k.keyword.id),
    };
    setResource(editData);
    setIsModalOpen(true);
  };

  if (isLoading) return <ResourceDetailSkeleton />;

  return (
    <div>
      <div className="container">
        <Button
          onClick={() => router.push("/admin/resources/resources-list")}
          className="bg-dashboard-primary text-white h-10 mb-3"
        >
          <Pencil /> Back
        </Button>
        <div className="relative">
          <Button
            onClick={handleEdit}
            className="bg-dashboard-primary text-white h-10 absolute right-4 top-4"
          >
            <Pencil /> Edit
          </Button>
          <ResourceHeaderDetails
            title={resourceData?.title}
            description={resourceData?.description}
            uploader={resourceData?.uploader}
            createdAt={resourceData?.createdAt}
            updatedAt={resourceData?.updatedAt}
            organization={resourceData?.organization}
            totalDownloadCount={resourceData?.totalDownloadCount}
            totalViewCount={resourceData?.totalViewCount}
            filesCount={resourceData?.filesCount}
            keywords={resourceData?.keywords}
            className="bg-white"
          />
          <UpdateResources
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setResource(undefined);
            }}
            initialValues={resource}
          />
        </div>
        <div>
          <UpdateResourceFiles
            initialValues={resourceData?.resourceFiles?.map((f) => ({
              ...f,
              description: f.description ?? "",
            }))}
          />
        </div>
      </div>
    </div>
  );
}
