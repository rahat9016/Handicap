type IQuickAccessCard = {
  date: string;
  title: string;
  desc: string;
  pathname?: string;
};
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { format } from "date-fns";

export default function QuickAccessCard({
  date,
  title,
  desc,
  pathname = "#",
}: IQuickAccessCard) {
  const router = useRouter();
  return (
    <div className="border border-[#AFC4FF] p-8 rounded-xl">
      <p className="text-sm font-medium font-inter bg-[#22C55E14] border border-[#22C55E66] text-[#22C55E] px-3 py-[6px] rounded-full w-[94px] max-w-[120px] text-center ">
        {date ? format(new Date(date), "MMM yyyy") : "N/A"}{" "}
      </p>
      <p className="text-base font-inter font-semibold group-hover:text-white text-primary mt-3">
        {title}
      </p>
      <p className="text-sm font-inter font-medium text-[#666666] mt-3">
        {desc}
      </p>
      <Button
        className="mt-2 bg-dashboard-primary"
        onClick={() => router.push(`${pathname}`)}
      >
        View
      </Button>
    </div>
  );
}
