import { cn } from "@/lib/utils";

export default function SectionTopTitle({
  title,
  desc,
  classTitle,
  classDesc,
}: {
  title: string;
  desc: string;
  classTitle?: string;
  classDesc?: string;
}) {
  return (
    <div className="text-center">
      <h1
        className={cn(
          "text-4xl font-inter text-primary font-semibold",
          classTitle
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          "text-sm font-inter text-[#666666] font-medium mt-3 lg:mt-6 leading-[28px] mx-auto w-full lg:w-6/12",
          classDesc
        )}
      >
        {desc}
      </p>
    </div>
  );
}
