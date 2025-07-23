import Image from "next/image";

interface ITotalCardProps {
  icon: string;
  shape: string;
  title: string;
  count: number | string;
}

export default function TotalCard({ icon, shape, title, count }: ITotalCardProps) {
  return (
    <div className="relative group rounded-lg bg-white shadow-sm p-6 w-full overflow-hidden transition-colors duration-300 hover:bg-[#135393] border border-skeleton">
      <div className="absolute inset-0 flex justify-end items-end transition-all duration-500 pointer-events-none w-full">
        <Image
          width={60}
          height={60}
          src={shape}
          alt="dashboard"
          className="w-32 h-32 transform translate-y-[-60%] group-hover:translate-y-[20%] transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-center items-center w-14 h-14 bg-primaryLight group-hover:bg-white rounded-md border border-[#C6DFF8]">
          <Image
            width={32}
            height={32}
            src={icon}
            alt="dashboard"
            className="w-8 h-8"
          />
        </div>

        <div>
          <p className="text-sm text-[#4D4D4D] group-hover:text-skeleton transition-colors duration-300 font-inter mt-[14px]">
            {title}
          </p>
          <p className="text-[28px] font-inter font-semibold text-erieBlack group-hover:text-white transition-colors duration-300 mt-1">
            {count}
          </p>
        </div>
      </div>
    </div>
  );
}
