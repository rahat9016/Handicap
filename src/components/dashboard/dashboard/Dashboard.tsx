"use client";

import { useState, JSX } from "react";
import { getUsers } from "@/api/users";
import { getUserInfo } from "@/services/auth.service";
import { toast } from "react-toastify";
import { Loader2, Users, CheckCircle, Hourglass } from "lucide-react";

export default function Dashboard() {
    const { email } = (getUserInfo() as { email?: string }) || {};
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const users = await getUsers();
            toast.success("Users fetched successfully!");
            console.log(users);
        } catch (error) {
            toast.error("Failed to fetch users!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Welcome, {email || "User"}!
                    </h1>
                    {email && <p className="text-gray-600">Email: {email}</p>}

                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardCard
                        title="Total Users"
                        count="1,245"
                        icon={<Users className="w-6 h-6 text-blue-500" />}
                    />
                    <DashboardCard
                        title="Active Users"
                        count="890"
                        icon={<CheckCircle className="w-6 h-6 text-green-500" />}
                    />
                    <DashboardCard
                        title="Pending Requests"
                        count="75"
                        icon={<Hourglass className="w-6 h-6 text-yellow-500" />}
                    />
                </div>

                {/* Fetch Users Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center"
                        onClick={fetchUsers}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                                Fetching...
                            </>
                        ) : (
                            "Fetch Users"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

const DashboardCard = ({ title, count, icon }: { title: string; count: string; icon: JSX.Element }) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
            <div className="p-3 bg-gray-100 rounded-lg mr-4">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                <p className="text-xl font-bold text-gray-900">{count}</p>
            </div>
        </div>
    );
};
