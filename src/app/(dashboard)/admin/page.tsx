import Loader from "@/components/share/loader/Loader";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Next-b-auth | admin",
};

export default function Page() {
    const DynamicAdmin = dynamic(
        () => import("@/components/dashboard/admin/Admin"),
        {
            loading: () => <Loader />
        }
    );
    return (
        <div><DynamicAdmin /></div>
    )
}
