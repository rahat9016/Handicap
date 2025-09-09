import { IVideoContent } from "@/components/main/training/types/traning";
import Paragraph from "@/components/share/Paragraph";
import { StatusToggle } from "@/components/share/StatusToggle";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import Image from "next/image";

export default function CourseVideoList({
  courseContentList,
  className,
}: {
  courseContentList: IVideoContent[] | never[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-6 bg-slate-50 border p-6 rounded-lg shadow-sm",
        className
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseContentList?.map((item, i) => (
          <Card
            key={item.id}
            className="relative cursor-pointer hover:shadow-lg transition border rounded-xl"
          >
            <div className="flex justify-end px-2 absolute right-0 top-3 gap-3">
              <Paragraph>Ordering: {i+1}</Paragraph>
              <StatusToggle
                id={10}
                status={false}
                onConfirm={async () => {
                  console.log("clicked");
                  // await mutateAsync({
                  //   url: `/course/${id}/publish`,
                  //   data: { isPublished: newStatus },
                  // });
                }}
              />
            </div>
            <CardContent className="flex items-center gap-4 mt-2 ">
              <div className="flex-shrink-0">
                {item.contentType === "VIDEO" ? (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image
                      className="w-10 h-10"
                      src="/video.png"
                      alt="video"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image
                      className="w-10 h-10"
                      src="/youtube_play.png"
                      alt="youtube"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
