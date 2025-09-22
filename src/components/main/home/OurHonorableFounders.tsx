import SectionTopTitle from "@/components/share/SectionTopTitle";
import Image from "next/image";

export default function OurHonorableFounders() {
  return (
    <div className="relative w-full bg-cover bg-center">
      <div className="container">
        <div className="py-10 lg:py-10">
          <SectionTopTitle
            title="With the sponsor of"
            desc="This hub is developed with funding from the Commonwealth of Australia represented by the Department of Foreign Affairs and Trade (DFAT) and is supported by Humanity & Inclusion and the Age and Disability Technical Working Group (ADTWG) under the ISCG."
          />
           <div className="w-full lg:w-8/12 mx-auto mt-[60px] grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center  gap-6 ">
           <Image width={380} height={222} src={`/images/home/sponsor1.jpeg`} alt="Founders" className="mx-auto"/>
           <Image width={380} height={222} src={`/images/home/sponsor2.jpeg`} alt="Founders" className="mx-auto"/>
           <Image width={380} height={222} src={`/images/home/sponsor3.jpeg`} alt="Founders" className="mx-auto"/>
            
          </div>
        </div>
      </div>
    </div>
  )
}
