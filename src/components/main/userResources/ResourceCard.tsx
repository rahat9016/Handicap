"use client";
import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PDFModal from "./PDFModal";

interface ResourceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  size: string;
  ratings?: number;
  downloads: number;
  isFeatured?: boolean;
  isPdf?: boolean;
}

export default function ResourceCard({
  title,
  description,
  imageUrl,
  date,
  size,
  ratings,
  downloads,
  isFeatured,
  isPdf,
}: ResourceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col">
      <PDFModal
        open={open}
        onClose={() => setOpen(false)}
        data={{
          title,
          description,
          imageUrl,
          date,
          size,
          ratings: ratings ?? 0,
          downloads,
          isFeatured,
          isPdf,
        }}
      />
      <div className="relative w-full h-56">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        {isFeatured && (
          <Badge className="bg-[#F26419] text-white absolute left-3 top-5">
            Featured
          </Badge>
        )}
        {isPdf && (
          <Badge className="bg-[#00A896] text-white absolute right-3 top-5">
            PDF Document
          </Badge>
        )}
      </div>

      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <Title className="lg:text-lg mb-3 line-clamp-1 text-black">
            {title}
          </Title>
          <Paragraph className="line-clamp-3">{description}</Paragraph>
          <div className="grid grid-cols-2 mt-3">
            <Paragraph>{downloads} Downloads</Paragraph>
            <Paragraph>Ratings: {ratings}</Paragraph>
            <Paragraph>Date: {date}</Paragraph>
            <Paragraph>File Size: {size}</Paragraph>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <Button className="w-full h-10 bg-primary text-white">
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <Button
            onClick={() => setOpen(true)}
            className="w-full h-10 bg-transparent hover:bg-transparent border border-[#00A896] text-[#00A896]"
          >
            <Eye className="w-4 h-4 mr-1" /> Preview
          </Button>
        </div>
      </div>
    </div>
  );
}