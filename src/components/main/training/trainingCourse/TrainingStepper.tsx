import Image from "next/image";

interface IStepper {
  icon: string;
  label: string;
  desc: string;
  isCompleted: boolean;
  isActive: boolean;
}
const TrainingStepper = ({ steps }: { steps: IStepper[] }) => {
  return (
    <>
      <div className="container py-10">
        <div className="border-y border-[#B7B7B7] flex items-center justify-between py-5 lg:py-10 rounded-[20px]">
          {steps.map((step, i) => {
          const isActive = step.isActive;
          const isCompleted = step.isCompleted;

          return (
            <div
              key={i}
              className={`relative flex flex-col justify-center items-center w-full`}
            >
              {i !== 0 && (
                <div
                  className={`absolute top-[25%] -translate-y-1/2 right-[65%] w-[70%] h-[2px] 
            ${isActive || isCompleted ? "bg-[#2A53CD]" : "bg-[#5ABBFD]"}`}
                />
              )}

              <div
                className={`w-10 h-10 flex items-center justify-center p-2 z-10 relative 
          rounded-full font-semibold  
          ${
            isCompleted || isActive
              ? "bg-[#2A53CD] text-white"
              : "bg-gray text-black"
          }`}
              >
                <Image
                  width={22}
                  height={22}
                  src={step.icon}
                  alt="Icon"
                  className={isCompleted || isActive ? "white-filter" : ""}
                />
              </div>

              <p
                className={`text-sm font-medium font-inter text-[#666666] mt-3`}
              >
                {step.label}
              </p>
              <p
                className={`text-base font-normal font-inter text-black mt-[2px] leading-none`}
              >
                {step.desc}
              </p>
            </div>
          );
        })}
        </div>
      </div>

      {/* {active > 0 && (
        <button className="btn" onClick={handlePrev}>
          Back
        </button>
      )}
      {active < steps.length && (
        <button className="btn" onClick={handleNext}>
          {active === steps.length - 1 ? "Finish" : "Next"}
        </button>
      )} */}
    </>
  );
};

export default TrainingStepper;
