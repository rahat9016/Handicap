"use client";
import Paragraph from "@/components/share/Paragraph";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";
import { isValidUrl } from "@/utils/isValidUrl";
import { User, UserPen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EditMyProfileInformation from "./EditMyProfileInformation";

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { userInformation } = useAppSelector((state) => state.auth);
  const isValid = isValidUrl(userInformation?.profilePicture || "");
  return (
    <div>
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 h-[calc(100vh-200px)]overflow-y-auto scrollbar-hide">
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

        <div>
          {isValid && (
            <Image
              src={userInformation?.profilePicture as string}
              alt="Profile Picture"
              width={200}
              height={200}
              className="rounded-full w-[200px] h-[200px] object-cover col-span-2 mb-4"
            />
          )}
          <div className="bg-slate-50 grid md:grid-cols-2 gap-6 p-4 rounded-lg border">
            <div>
              <h3 className="text-black font-inter font-medium">First Name</h3>
              <Paragraph>{userInformation.firstName ?? "--------"}</Paragraph>
            </div>
            <div>
              <h3 className="text-black font-inter font-medium">Last Name</h3>
              <Paragraph>{userInformation.lastName ?? "--------"}</Paragraph>
            </div>
            <div>
              <h3 className="text-black font-inter font-medium">Email</h3>
              <Paragraph>{userInformation.email ?? "--------"}</Paragraph>
            </div>
            <div>
              <h3 className="text-black font-inter font-medium">
                My contact number
              </h3>
              <Paragraph>{userInformation.phone ?? "--------"}</Paragraph>
            </div>
            <div>
              <h3 className="text-black font-inter font-medium">
                My Verification
              </h3>
              <Paragraph>
                {userInformation.isVerified ? "Verified" : "Not Verified"}
              </Paragraph>
            </div>
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
