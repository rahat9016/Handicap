import { Button } from "@/components/ui/button";

export default function HomeHeroSection() {
  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: `url('/images/home/hero1.jpg')` }}
    >
      <div className="container  absolute inset-0 mt-52 rounded-[12px]">
        <div className="bg-[#00000099] h-[418px] flex items-center justify-center">
        <div className="text-center w-9/12 px-4 text-white">
          <h1 className="text-5xl md:text-5xl font-bold leading-tight font-inter">
            The Disability Inclusion Resource Hub is a
            centralized platform.
          </h1>
          <p className="text-lg font-inter text-[#DBDBDB] leading-[30px]">
            A centralized platform offering disability inclusion resources to support humanitarian
            actors in delivering accessible, equitable, and inclusive services for persons with
            disabilities in Cox’s Bazar, Bangladesh—ensuring no one is left behind in emergency
            response, recovery, and long-term development efforts.
          </p>
          <Button className="px-10 py-4 h-[46px] border text-white border-white bg-transparent hover:bg-primary  hover:text-white transition rounded text-base cursor-pointer font-inter">
            See More
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
}
