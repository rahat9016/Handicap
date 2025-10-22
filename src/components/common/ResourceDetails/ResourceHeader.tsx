"use client";

import { IResource } from "@/components/dashboard/resources/types/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Share2 } from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ResourceHeaderProps {
  backHref?: string;
  categoryName?: string;
  onBookmarkToggle?: (bookmarked: boolean) => void;
  resourceData: IResource;
}

export function ResourceHeader({
  backHref = "/resources",
  categoryName,
  resourceData,
}: ResourceHeaderProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // const toggleBookmark = () => {
  //   const newValue = !isBookmarked;
  //   setIsBookmarked(newValue);
  //   if (onBookmarkToggle) onBookmarkToggle(newValue);
  // };

  const handleShare = () => {
    const title = resourceData?.title?.en || "Check this out!";
    const description = resourceData?.description?.en || "";

    if (navigator.share) {
      navigator
        .share({
          title,
          text: description,
          url: currentUrl,
        })
        .then(() => toast.success("Shared successfully"))
        .catch((err) => console.error("Share failed:", err));
    } else {
      const shareText = encodeURIComponent(`${title}\n${currentUrl}`);
      const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${shareText}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${shareText}`,
      };

      // Open popup (you can change to another network)
      window.open(shareUrls.facebook, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="container my-10">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href={backHref}>
            <Button className="bg-dashboard-primary text-white h-10 font-inter text-sm font-normal">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Button>
          </Link>

          {categoryName && (
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="capitalize h-10 font-inter text-sm font-normal"
              >
                {categoryName}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* <Button
            variant="outline"
            onClick={toggleBookmark}
            className="h-10 font-inter text-sm font-normal"
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button> */}

          <Button
            variant="outline"
            className="h-10 font-inter text-sm font-normal"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
