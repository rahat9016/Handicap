import SectionTopTitle from "@/components/share/SectionTopTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FindResources() {
  return (
    <div className="relative w-full bg-cover bg-center"
      style={{ backgroundImage: `url('/images/home/FindResourcesBg.png')` }}>
      <div className="container">
        <div className="py-10 lg:py-20">
          <SectionTopTitle
            title="Find Resources"
            desc="Access a wide range of materials designed to inform, support, and empower. Whether you're looking for training guides, policy documents, toolkits, or educational content"
          />
          <div className="w-full lg:w-7/12 mx-auto mt-[60px]">
            <div className="flex items-center gap-3">
                <Input placeholder="Search for resources, guidelines, training materials..." className="border border-[#7297FF] h-[46px] focus:border-[#7297FF] placeholder:text-[#B7B7B7] bg-white"/>
                <div>
                    <Button className="bg-[#2A53CD] text-white h-[46px] flex items-center font-inter text-sm font-medium px-6"><Search />Search now</Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
