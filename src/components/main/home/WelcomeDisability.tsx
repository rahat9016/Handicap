import TitleTag from '@/components/share/TitleTag'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'
import Image from 'next/image'
import shape_1 from "../../../../public/images/common/shape_1.png"
import bg from "../../../../public/images/home/bg.png"

export default function WelcomeDisability() {
  return (
    <div style={{
        backgroundImage: `url(${bg.src})`,
      }} className="py-10 xl:py-20 bg-cover"
      >
      <div className="container">
        <div className="flex flex-col items-start lg:flex-row gap-5 lg:gap-10 mt-7 lg:mt-14">
          <div
            className="w-full lg:w-1/2 p-4 object-contain bg-contain bg-no-repeat ml-auto"
            style={{
              backgroundImage: `url(${shape_1.src})`,
            }}
          >
            <Image
              src={'/images/home/welcome.jpg'}
              alt="welcome Img"
              width={590}
              height={410}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <TitleTag title="Welcome To The" />
            <h1 className="text-2xl lg:text-4xl text-primary font-inter font-semibold mt-2 lg:mt-4" tabIndex={0}>
              Welcome to the Disability Inclusion Resource Hub
            </h1>
            <div tabIndex={0}>
            <p className="text-sm font-inter text-[#353535] font-normal mt-3 lg:mt-5 leading-[28px]">
              This platform serves as a centralized repository for disability inclusion resources developed over the past six years of humanitarian response in Cox&apos;s Bazar. It aims to support humanitarian actors in implementing inclusive practices that reach people with disabilities.
            </p>
            <p className="text-sm font-inter text-[#353535] font-normal mt-3 lg:mt-5 leading-[28px]">
              Developed by Humanity & Inclusion in collaboration with the Age and Disability Technical Working Group (ADTWG), this hub provides access to guidelines, training materials, research reports, and practical tools to support disability-inclusive humanitarian action.    
            </p>
            <p className="text-sm font-inter text-[#353535] font-normal mt-3 lg:mt-5 leading-[28px]">
              All resources are designed to be accessible and follow WCAG 2.1 guidelines, ensuring that persons with disabilities can access and utilize these materials.   
            </p>
            </div>
            <Button className='bg-transparent hover:bg-transparent text-pureBlack hover:text-[#01014E] shadow-none text-base font-inter font-semibold'>See more <MoveRight /></Button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
