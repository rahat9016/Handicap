import SectionTopTitle from "@/components/share/SectionTopTitle";
import Image from "next/image";

export default function OurHonorableFounders() {
  return (
    <div className="relative w-full bg-cover bg-center">
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="Our Honorable Founders"
            desc="Access vocational training and employment opportunities designed to empower persons with disabilities—gain practical skills, receive career guidance, and connect with inclusive"
          />
          <div className="w-full lg:w-8/12 mx-auto mt-[60px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 12 }, (_, index) => (
            <Image width={180} height={133} key={index} src={`/images/home/sponsor${index+1}.png`} alt="Founders"/>
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}
