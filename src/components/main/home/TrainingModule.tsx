'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const slides = [
  {
    title: 'New Training Module Released',
    description:
      'Explore our newly launched training module focused on practical approaches to disability inclusion in humanitarian settings. Gain actionable insights and tools to enhance your team\'s capacity and promote inclusive practices in field operations.',
    button: 'Read More',
  },
  {
    title: 'Field Practices Improved',
    description:
      'Our modules now include real-world scenarios and lessons from past humanitarian missions to improve practical understanding.',
    button: 'Read More',
  },
]

export default function TrainingModule() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToNextSlide = () => {
    setDirection('right')
    setPrevSlide(currentSlide)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToPrevSlide = () => {
    setDirection('left')
    setPrevSlide(currentSlide)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[767px] w-full overflow-hidden">
      <Image
      width={1920}
      height={767}
        src="/images/home/hero1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className='container h-[504px] absolute inset-0 bg-[#000000CC]/60  z-20 top-1/2 -translate-y-1/2 '>
      <div className="flex flex-col items-center h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute transition-all duration-700 flex flex-col items-center justify-center ease-in-out text-white text-center px-4 h-full w-9/12
              ${index === currentSlide ? 'opacity-100 translate-x-0 z-20' : 'opacity-0 z-10'}
              ${
                index === prevSlide
                  ? direction === 'right'
                    ? '-translate-x-full'
                    : 'translate-x-full'
                  : ''
              }
            `}
          >
            <h2 className="text-3xl lg:text-5xl font-semibold mb-6 font-inter">{slide.title}</h2>
            <p className="text-sm lg:text-lg mb-6 font-inter">{slide.description}</p>
            <Button className="bg-transparent hover:bg-[#2A53CD] text-white font-medium py-2 h-12 rounded transition shadow-none text-base border px-10 font-inter">
              {slide.button}
            </Button>
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
    </div>
  )
}
