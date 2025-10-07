import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Link } from "@/i18n/navigation";
import { isValidUrl } from "@/utils/isValidUrl";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { INews } from "./types/news";

export default function NewsCard({
  id,
  title,
  images,
  summary
}: INews) {
  const isValid = isValidUrl(images[0]?.imageUrl);
  // console.log(images[0]?.imageUrl)
  return (
    <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col">
      <div className="relative w-full h-44 bg-gray-50 flex items-center justify-center">
        {isValid ? (
          <Image
            src={images[0]?.imageUrl}
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

      <div className="flex flex-col justify-between p-3 gap-2 flex-1">
        <div>
          <Title
            className="lg:text-lg line-clamp-1 text-black"
          >
            {title}
          </Title>
          <Paragraph className="line-clamp-2 mb-2">{summary}</Paragraph>

          
        </div>

        <div className="flex flex-col gap-2 mt-0">
          <Link
            href={`/news/${id}`}
            className="w-full h-10 bg-transparent duration-300 border border-dashboard-primary text-dashboard-primary flex items-center justify-center text-center rounded-full font-inter font-medium text-base hover:bg-dashboard-primary hover:text-white"
          >
             Read Full News <ArrowUpRight className="w-4 h-4 mr-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
