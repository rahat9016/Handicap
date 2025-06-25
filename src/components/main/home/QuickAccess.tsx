import SectionTopTitle from "@/components/share/SectionTopTitle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import QuickAccessCard from "./QuickAccessCard";

export default function QuickAccess() {
  const resources = {
    featured1: [
      {
        date: "Apr 2023",
        title: "Disability Inclusion in WASH",
        desc: "Guidelines for inclusive WASH facilities in humanitarian settings",
        downloads: 78,
      },
      {
        date: "Jun 2023",
        title: "Inclusive Education in Emergencies",
        desc: "Best practices for ensuring education access for children with disabilities",
        downloads: 64,
      },
      {
        date: "Feb 2024",
        title: "Accessible Shelter Guidelines",
        desc: "Technical specifications for accessible shelter design",
        downloads: 52,
      },
    ],
    featured2: [
      {
        date: "Jan 2024",
        title: "Assistive Tech Tools",
        desc: "Tools and software for accessibility improvements",
        downloads: 35,
      },
    ],
    announcements: [
      {
        date: "Mar 2024",
        title: "New Training Program Launched",
        desc: "Vocational training for persons with disabilities now open",
        downloads: 0,
      },
    ],
  };

  return (
    <div className="relative w-full bg-white">
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="Quick Access"
            desc="Access vocational training and employment opportunities designed to empower persons with disabilities—gain practical skills, receive career guidance, and connect with inclusive"
          />
          <div className="w-full lg:w-9/12 mx-auto ">
            <Tabs defaultValue="featured1" className="mt-0">
              <div className="w-6/12 mx-auto ">
                <TabsList className="mx-auto flex-col lg:flex-row w-fit bg-transparent rounded-lg mb-6 gap-5">
                  <TabsTrigger
                    className="group bg-[#DBE4FF] px-8 py-3 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex items-center gap-3"
                    value="featured1"
                  >
                    <Image
                      className="transition
                                    group-data-[state=active]:white-filter"
                      width={20}
                      height={20}
                      src={"/images/home/icon__1.svg"}
                      alt="icon_1.svg"
                      
                    />
                    Featured Resources
                  </TabsTrigger>
                  <TabsTrigger
                   className="group bg-[#DBE4FF] px-8 py-3 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex items-center gap-3"
                    value="featured2"
                  >
                    <Image
                      className="transition
                                    group-data-[state=active]:white-filter"
                      width={20}
                      height={20}
                      src={"/images/home/icon__2.svg"}
                      alt="icon_1.svg"
                      
                    />
                    Featured Resources
                  </TabsTrigger>
                  <TabsTrigger
                    className="group bg-[#DBE4FF] px-8 py-3 text-[#0D0D0D] data-[state=active]:bg-black data-[state=active]:text-white flex items-center gap-3"
                    value="announcements"
                  >
                    <Image
                      className="transition
                                    group-data-[state=active]:white-filter"
                      width={20}
                      height={20}
                      src={"/images/home/icon__3.svg"}
                      alt="icon_1.svg"
                      
                    />
                    Announcements
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="mt-20 lg:mt-10">
                <TabsContent value="featured1">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
                  {resources.featured1.map((item, idx) => (
                    <QuickAccessCard key={idx} {...item} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured2">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
                  {resources.featured2.map((item, idx) => (
                    <QuickAccessCard key={idx} {...item} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="announcements">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
                  {resources.announcements.map((item, idx) => (
                    <QuickAccessCard key={idx} {...item} />
                  ))}
                </div>
              </TabsContent>
              </div>
            </Tabs>
            <div className="flex justify-end mt-6">
                <Button className="text-primary bg-transparent hover:bg-transparent hover:underline ">View All Resources <MoveRight /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
