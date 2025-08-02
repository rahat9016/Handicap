import { BadgeCheck, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { IUser } from "../../organizer/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";

export default function ViewDetails({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user?: IUser
}) {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>View Details</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
          {user?.profilePicture ? (
            <Image
              src={user?.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-full h-full p-4 text-gray-400" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="w-4 h-4" /> {user?.email}
          </p>
          {user?.phone && (
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Phone className="w-4 h-4" /> {user?.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Status:</span>
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              user?.accountStatus === "ACTIVE"
                ? "bg-[#bfffda] text-green"
                : "bg-rose-200 text-rose-700"
            }`}
          >
            {user?.accountStatus}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Role:</span>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {user?.roleName}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Verified:</span>
          <span className="text-sm flex items-center gap-1 text-green">
            {user?.isVerified ? (
              <>
                <BadgeCheck className="w-4 h-4 text-green" />
                Verified
              </>
            ) : (
              "Not Verified"
            )}
          </span>
        </div>
      </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
