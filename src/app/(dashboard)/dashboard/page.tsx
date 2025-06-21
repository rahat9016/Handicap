
import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Next-b-auth | Dashboard",
};


export default function Page() {
    const DynamicDashboard = dynamic(
        () => import("@/components/dashboard/dashboard/Dashboard"),
        {
            loading: () => <Loader />,
        }
    );
    return (
        <div><DynamicDashboard /></div>
    )
}