import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import { IEventItem } from "./types/interface";

export default function EventCard({
  id,
  title,
  description,
  location,
  address,
  startDate,
  endDate,
  isOnline,
  featuredImage,
  categories,
  tags,
  images,
}: IEventItem) {
  const eventImage =
    images?.[0]?.imageUrl && images[0].imageUrl !== ""
      ? images[0].imageUrl
      : featuredImage || "/images/dashboard/gallery-add.svg";

  const category = categories?.[0]?.category?.name || "Uncategorized";
  const tag = tags?.[0]?.tag?.name || "";
  return (
    <div className="rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={eventImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {isOnline && (
          <span className="absolute top-3 left-3 bg-green text-white text-xs px-2 py-1 rounded-full shadow">
            Online
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between p-4 gap-2 flex-1">
        <div>
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>

          <div
            className="text-gray-600 text-sm line-clamp-2 mb-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {location || address}
            </span>

            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(startDate), "dd MMM yyyy")} -{" "}
              {format(new Date(endDate), "dd MMM yyyy")}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {category}
            </span>
            {tag && (
              <span className="flex items-center gap-1 text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Link
            href={`/events/${id}`}
            className={cn(
              "w-full h-10 flex items-center justify-center rounded-full border border-blue-600 font-medium text-sm transition-all duration-300 bg-dashboard-primary text-white"
            )}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
