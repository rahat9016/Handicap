import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Link } from "@/i18n/navigation";
import { isValidUrl } from "@/utils/isValidUrl";
import { format } from "date-fns";
import { ArrowUpRight, Building2, Clock } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  durationMinutes: number;
  isActive: boolean;
  createdAt: string;
  thumbnailUrl: string;
  organization: {
    id: number;
    name: string;
    code: string;
  };
  location: string
}

export default function CourseCard({
  id,
  title,
  description,
  durationMinutes,
  createdAt,
  thumbnailUrl,
  organization,
  location
}: CourseCardProps) {
  const isValid = isValidUrl(thumbnailUrl);
  console.log(id)
  return (
    <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col">
      <div className="relative w-full h-44 bg-gray-50 flex items-center justify-center">
        {isValid ? (
          <Image
            src={thumbnailUrl!}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src="/images/dashboard/gallery-add.svg"
            alt="Not Found"
            width={120}
            height={120}
            className="object-contain"
          />
        )}

      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-3 gap-2 flex-1">
        <div>
          <Title
            className="lg:text-lg line-clamp-1 text-black"
          >
            {title}
          </Title>
          <Paragraph className="line-clamp-2 mb-2">{description}</Paragraph>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Building2 className="w-4 h-4" />
            {organization?.name}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Clock className="w-4 h-4" />
            Duration: {durationMinutes > 0 ? `${durationMinutes} min` : "0"}
          </div>

          <Paragraph className="text-sm text-gray-500">
            {format(new Date(createdAt), "dd MMM yyyy")}
          </Paragraph>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-0">
          <Link
            href={location}
            className="w-full h-10 bg-transparent duration-300 border border-dashboard-primary text-dashboard-primary flex items-center justify-center text-center rounded-full font-inter font-medium text-base hover:bg-dashboard-primary hover:text-white"
          >
             Continue Course <ArrowUpRight className="w-4 h-4 mr-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
