"use client";
import Paragraph from "@/components/share/Paragraph";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { User, UserPen } from "lucide-react";
import { useState } from "react";
import EditMyProfileInformation from "./EditMyProfileInformation";

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { userInformation } = useAppSelector((state) => state.auth);
  return (
    <div>
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 h-[calc(100vh-200px)]">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-dashboard-primary rounded-lg flex items-center justify-center text-white">
              <User />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-erieBlack font-inter">
                My Profile Information
              </h1>
              <p className="font-inter text-xs">Manage my profile</p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2"
          >
            <UserPen className="w-4 h-4" /> Edit
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-black font-inter font-medium">First Name</h3>
            <Paragraph className="ml-1">
              {userInformation.firstName ?? "--------"}
            </Paragraph>
          </div>
          <div>
            <h3 className="text-black font-inter font-medium">Last Name</h3>
            <Paragraph className="ml-1">
              {userInformation.lastName ?? "--------"}
            </Paragraph>
          </div>
          <div>
            <h3 className="text-black font-inter font-medium">Email</h3>
            <Paragraph className="ml-1">
              {userInformation.email ?? "--------"}
            </Paragraph>
          </div>
          <div>
            <h3 className="text-black font-inter font-medium">
              My contact number
            </h3>
            <Paragraph className="ml-1">
              {userInformation.phone ?? "--------"}
            </Paragraph>
          </div>
          <div>
            <h3 className="text-black font-inter font-medium">
              My Verification
            </h3>
            <Paragraph className="ml-1">
              {userInformation.isVerified ? "Verified" : "Not Verified"}
            </Paragraph>
          </div>
        </div>

        <EditMyProfileInformation
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          initialValues={userInformation}
        />
      </div>
    </div>
  );
}
