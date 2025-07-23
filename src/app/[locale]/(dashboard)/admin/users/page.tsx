import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Next-b-auth | user",
};

export default function Page() {
    const DynamicUser = dynamic(
        () => import("@/components/dashboard/user/User"),
        {
            loading: () => <Loader />,
        }
    );
    return (
        <div><DynamicUser /></div>
    )
}
