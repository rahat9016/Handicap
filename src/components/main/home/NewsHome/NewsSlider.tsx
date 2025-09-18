/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { INewsSection } from "@/components/news/AllNews/types";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
interface NewsSliderProps {
  slides: INewsSection[];
}
const NewsSlider = ({ slides }: NewsSliderProps) => {
    console.log(slides);
    
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => {
      setPrevSlide(prev);
      return (prev + 1) % slides.length;
    });
    setDirection("right");
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => {
      setPrevSlide(prev);
      return (prev - 1 + slides.length) % slides.length;
    });
    setDirection("left");
  };
  return (
    <div className="container h-[504px] absolute inset-0 bg-[#000000CC]/60  z-20 top-1/2 -translate-y-1/2 ">
      <div className="flex flex-col items-center h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute transition-all duration-700 flex flex-col items-center justify-center ease-in-out text-white text-center px-4 h-full w-9/12
              ${
                index === currentSlide
                  ? "opacity-100 translate-x-0 z-20"
                  : "opacity-0 z-10"
              }
              ${
                index === prevSlide
                  ? direction === "right"
                    ? "-translate-x-full"
                    : "translate-x-full"
                  : ""
              }
            `}
          >
            <h2 className="text-3xl lg:text-5xl font-semibold mb-6 font-inter">
              {slide.title}
            </h2>
            <p className="text-sm lg:text-lg mb-6 font-inter">
              {slide.summary}
            </p>
            <Link href={`/news/${slide?.id}`}>  
            <Button className="bg-transparent hover:bg-[#2A53CD] text-white font-medium py-2 h-12 rounded transition shadow-none text-base border px-10 font-inter">
              Read More
            </Button>
            </Link>
          </div>
        ))}
      </div>
      <Button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default NewsSlider
