import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import Image from "next/image";

export default function UpcomingLiveEvents() {
  return (
    <div className="bg-[#F4F8FF]">
      <div className="container py-10 lg:py-20">
        <div className="flex items-center gap-20">
            <div className="w-full lg:w-1/2 -mt-32 -mb-32">
                <div className="flex items-end gap-5">
                    <Image width={307} height={305} src="/images/training/live1.jpg" alt="live1" />
                    <Image width={249} height={205} src="/images/training/live2.jpg" alt="live1" />
                </div>
                <Image width={307} height={305} src="/images/training/live3.jpg" alt="live1" className="ml-14 mt-6" />
            </div>
            <div className="w-full lg:w-1/2 ">
                <Title className="mb-6 lg:text-3xl">Upcoming Live Events</Title>
                <Paragraph className="text-[#666666] lg:text-base">Stay connected and informed through our upcoming live events, including webinars, training sessions, community discussions, and expert panels focused on disability inclusion. These events provide valuable opportunities to learn, share experiences, and engage with practitioners, advocates, and persons with disabilities from across Bangladesh and beyond.</Paragraph>
            </div>
        </div>
      </div>
    </div>
  );
}
