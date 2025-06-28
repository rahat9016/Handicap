type IQuickAccessCard = {
  date: string;
  title: string;
  desc: string;
};

export default function QuickAccessCard({
  date,
  title,
  desc,
}: IQuickAccessCard) {
  return (
    <div className="relative border border-[#AFC4FF] p-8 rounded-xl">
      <p className="text-sm font-medium font-inter bg-[#22C55E14] border border-[#22C55E66] text-[#22C55E] px-3 py-[6px] rounded-full w-[94px] max-w-[120px] text-center ">
        {date}{" "}
      </p>
      <p className="text-base font-inter font-semibold group-hover:text-white text-primary mt-3">
        {title}
      </p>
      <p className="text-sm font-inter font-medium text-[#666666] mt-3">
        {desc}
      </p>
    </div>
  );
}
