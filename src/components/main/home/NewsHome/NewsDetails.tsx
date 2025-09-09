"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { INewsSection } from '@/components/news/AllNews/types';
import { useGet } from '@/hooks/useGet';
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default NewsDetails;
