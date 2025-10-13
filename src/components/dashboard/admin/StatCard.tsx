// components/analytics/StatCard.tsx
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  description?: string;
  className?: string;
  shape?: ReactNode; // Optional shape background element
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  className = "",
}) => {
  return (
    <div className={`relative group rounded-lg bg-white shadow-sm p-6 w-full overflow-hidden transition-colors duration-300 hover:bg-[#135393] border border-skeleton ${className}`}>
      
      {/* Background Shape Animation */}
      {/* {shape && (
        <div className="absolute inset-0 flex justify-end items-end transition-all duration-500 pointer-events-none w-full">
          <div className="w-32 h-32 transform translate-y-[-60%] group-hover:translate-y-[20%] transition-transform duration-500 ease-in-out">
            {shape}
          </div>
        </div>
      )} */}

      {/* Content */}
      <div className="flex flex-col relative z-10">
        {/* Icon Container */}
        <div className="flex justify-center items-center w-14 h-14 bg-primaryLight group-hover:bg-white rounded-md border border-[#C6DFF8]">
          <div className="w-8 h-8 text-[#135393] group-hover:text-[#135393]">
            {icon}
          </div>
        </div>

        {/* Text Content */}
        <div className="mt-[14px]">
          <p className="text-sm text-[#4D4D4D] group-hover:text-skeleton transition-colors duration-300 font-inter">
            {title}
          </p>
          <p className="text-[28px] font-inter font-semibold text-erieBlack group-hover:text-white transition-colors duration-300 mt-1">
            {value}
          </p>
          
          {/* Trend and Description */}
          {trend && (
            <p className="text-sm text-[#4D4D4D] group-hover:text-skeleton transition-colors duration-300 mt-1">
              {trend}
            </p>
          )}
          {description && (
            <p className="text-xs text-[#4D4D4D] group-hover:text-skeleton transition-colors duration-300 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};