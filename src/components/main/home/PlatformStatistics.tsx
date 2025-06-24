
import icon from "../../../../public/images/home/icon.svg";
export default function PlatformStatistics() {
  return (
    <div className="container">
      <div className="py-22">
        <div className="text-center">
          <h1 className="text-4xl font-inter text-secondary font-semibold">
            Platform Statistics
          </h1>
          <p className="text-sm font-inter text-[#666666] font-medium mt-3 lg:mt-6 leading-[28px]">
            All resources are designed to be accessible and follow WCAG 2.1
            guidelines, ensuring that persons with disabilities can access and
            utilize these materials.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mt-[60px]">
          {[
            { label: "Total Resources", value: 245, icon: icon },
            { label: "Total Downloads", value: 1234, icon:"" },
            { label: "Active Users", value: 89, icon:"" },
            { label: "Training Completion", value: 156, icon:"" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="group bg-[#F3F3F4] rounded-lg p-6  "
            >
              <div>
                <p className="text-3xl font-bold text-blue-900">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
