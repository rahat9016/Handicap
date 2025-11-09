"use client";
import { INewsSection } from "@/components/news/AllNews/types";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const NewsDetails = () => {
  const { id } = useParams();

  const { data: newsData } = useGet<INewsSection>(
    `/news/${id}`,
    ["news", id as string],
    {},
    { enabled: id !== undefined }
  );

  const images = newsData?.data?.images ?? [];
  const title = newsData?.data?.title ?? "";
  const summary = newsData?.data?.summary ?? "";
  const content = newsData?.data?.content ?? "";

  // slider state
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goPrev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const goNext = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/news" className="w-full sm:w-auto ">
          <Button
            variant="outline"
            className="gap-2 bg-transparent w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Button>
        </Link>
      </div>
      {/* Image Slider */}
      {images.length > 0 && (
        <div className="relative w-full h-[400px] overflow-hidden rounded-xl mb-6">
          {images.map((img, index) => (
            <Image
              key={img.id}
              src={img.imageUrl}
              alt={`slide-${index}`}
              fill
              className={`object-cover transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Controls */}
          {images.length > 1 && (
            <>
              <Button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full ${
                  i === current ? "bg-white" : "bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* News Info */}
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-700 mb-6">{summary}</p>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {newsData?.data?.tags.map((tag) => (
          <span
            key={tag.tagId}
            className="flex items-center gap-1 text-xs bg-green/10 text-green px-2 py-1 rounded-full"
          >
            <Tag className="w-3 h-3" /> {tag.name}
          </span>
        ))}
      </div>

      <div
        className="max-w-none 
    [&>ul]:list-disc [&>ul]:ml-6
    [&>ol]:list-decimal [&>ol]:ml-6
    [&>li]:mb-1
    [&>blockquote]:relative [&>blockquote]:pl-5 [&>blockquote]:italic 
    [&>blockquote]:before:content-['❝'] [&>blockquote]:before:text-blue-600 
    [&>blockquote]:before:absolute [&>blockquote]:before:-left-1 [&>blockquote]:before:top-0"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {/* <RichTextDisplay content={content} /> */}
    </div>
  );
};

export default NewsDetails;
