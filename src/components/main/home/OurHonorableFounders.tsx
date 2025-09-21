import SectionTopTitle from "@/components/share/SectionTopTitle";
import Image from "next/image";

export default function OurHonorableFounders() {
  return (
    <div className="relative w-full bg-cover bg-center">
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="With the sponsor of"
            desc="This hub is developed with funding from the Australian Department of Foreign Affairs and Trade (DFAT) and is supported by Humanity & Inclusion and the Age and Disability Technical Working Group (ADTWG) under the ISCG."
          />
          {/* <div className="w-full lg:w-8/12 mx-auto mt-[60px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 12 }, (_, index) => (
            <Image width={180} height={133} key={index} src={`/images/home/sponsor${index+1}.png`} alt="Founders"/>
          ))}
          </div> */} 
          <Image width={380} height={222} src={`/images/home/australianGovt.png`} alt="Founders" className="mx-auto"/>
        </div>
      </div>
    </div>
  )
}
