import TotalCard from "./TotalCard"

const data = [
    {
        icon:"/images/dashboard/icon18.svg",
        shape: "/images/dashboard/cardShape2.svg",
        title:"Total Organization",
        count: 53
    },
    {
        icon:"/images/dashboard/icon21.svg",
        shape: "/images/dashboard/cardShape1.svg",
        title:"Total User",
        count: 45455
    },
    {
        icon:"/images/dashboard/icon19.svg",
        shape: "/images/dashboard/cardShape4.svg",
        title:"Total Recourses",
        count: 45455
    },
    {
        icon:"/images/dashboard/icon24.svg",
        shape: "/images/dashboard/cardShape3.svg",
        title:"Total Training",
        count: 333
    }
]

export default function AdminTotalCardSection() {
  return (
    <div>
        <div className="grid grid-cols-4 gap-6">
            {data.map((item, index) => <TotalCard key={index} {...item} /> )}
        </div>
    </div>
  )
}
