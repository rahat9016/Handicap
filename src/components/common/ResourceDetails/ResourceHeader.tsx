"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Bookmark, BookmarkCheck, Share2 } from "lucide-react";

import { useState } from "react";

interface ResourceHeaderProps {
  backHref?: string;
  categoryName?: string;
  initialBookmarked?: boolean;
  onBookmarkToggle?: (bookmarked: boolean) => void;
  onShare?: () => void;
}

export function ResourceHeader({
  backHref = "/resources",
  categoryName,
  initialBookmarked = false,
  onBookmarkToggle,
  onShare,
}: ResourceHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const toggleBookmark = () => {
    const newValue = !isBookmarked;
    setIsBookmarked(newValue);
    if (onBookmarkToggle) onBookmarkToggle(newValue);
  };

  return (
    <div className="container my-10">
      <div className="flex items-center gap-4">
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

        <div className="ml-auto flex items-center gap-2">
          <Button
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
          </Button>

          <Button
            variant="outline"
            className="h-10 font-inter text-sm font-normal"
            onClick={onShare}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
