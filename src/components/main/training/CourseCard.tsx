import Paragraph from "@/components/share/Paragraph";
import Title from "@/components/share/Title";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CourseCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
  level?: string;
  duration?: string;
}

const users = [
  "https://i.pravatar.cc/100?u=1",
  "https://i.pravatar.cc/100?u=2",
  "https://i.pravatar.cc/100?u=3",
  "https://i.pravatar.cc/100?u=4",
];
export default function CourseCard({
  title,
  description,
  imageUrl,
  isFeatured,
  duration,
  level,
}: CourseCardProps) {
  return (
    <div className="rounded-lg overflow-hidden border bg-white shadow-sm flex flex-col border-[#D9D9D9]">
      <div className="relative w-full h-56">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
        {isFeatured && (
          <Badge className="bg-[#F26419] text-white absolute right-3 top-5">
            Featured
          </Badge>
        )}
      </div>
      <div className="p-3 flex items-center justify-between ">
        <Paragraph className="border border-[#65A30D66] bg-[#65A30D14] text-[#65A30D] px-3 py-[6px] rounded-full">
          {level}
        </Paragraph>
        <Paragraph className="flex items-center gap-2 text-black">
          <Image
            width={20}
            height={20}
            src="/images/course/timer.svg"
            alt="timer"
          />
          {duration}
        </Paragraph>
      </div>
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <Title className="lg:text-lg mb-3 line-clamp-1 text-[#1A40AE]">
            {title}
          </Title>
          <Paragraph className="line-clamp-3">{description}</Paragraph>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center">
            <Image
              width={20}
              height={20}
              src="/images/resources/star.svg"
              alt="star"
            />
            <Image
              width={20}
              height={20}
              src="/images/resources/star.svg"
              alt="star"
            />
            <Image
              width={20}
              height={20}
              src="/images/resources/star.svg"
              alt="star"
            />
            <Image
              width={20}
              height={20}
              src="/images/resources/star.svg"
              alt="star"
            />
            <Image
              width={20}
              height={20}
              src="/images/resources/star.svg"
              alt="star"
            />
          </div>
          <Paragraph className="text-[#666666]">4.8/5.00</Paragraph>
          <Paragraph className="text-[#0000FF]">(48 reviews)</Paragraph>
        </div>
        <div className="flex items-center justify-between mb-6 mt-3">
          <div className="flex items-center mt-3 gap-2">
          <div className="flex -space-x-4 ">
            {users.map((image, index) => (
              <Avatar
                key={index}
                className="h-8 w-8 border-2 border-white dark:border-gray-900"
              >
                <AvatarImage src={image} alt={`User ${index + 1}`} />
              </Avatar>
            ))}
          </div>
          <Paragraph className="text-black">245+ Enrolled</Paragraph>
        </div>
        <div className="flex items-center gap-2">
          <Image
            width={20}
            height={20}
            src="/images/course/module.svg"
            alt="timer"
          />
          <Paragraph className="text-black">5 Modules</Paragraph>
        </div>
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <Button className="w-full h-10 bg-primary text-white">
            Preview Course
          </Button>
          <Button className="w-full h-10 bg-transparent hover:bg-transparent border border-[#B7B7B7] text-primary">
            Take Quiz Again
          </Button>
        </div>
      </div>
    </div>
  );
}
