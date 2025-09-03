import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { IOrganizationResponse } from "../types";


export default function ViewOrganizationDetails({
  isOpen,
  onClose,
  organization,
}: {
  isOpen: boolean;
  onClose: () => void;
  organization?: IOrganizationResponse;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-h-[20vh] w-[80vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Organization Details</DialogTitle>
        </DialogHeader>

        {/* Logo & Basic Info */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
            {organization?.logoUrl ? (
              <Image
                src={organization.logoUrl}
                alt="Organization Logo"
                className="w-full h-full object-cover"
                width={64}
                height={64}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                N/A
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{organization?.name}</h2>
            {organization?.contactEmail && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Mail className="w-4 h-4" /> {organization.contactEmail}
              </p>
            )}
            {organization?.contactPhone && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Phone className="w-4 h-4" /> {organization.contactPhone}
              </p>
            )}
            {organization?.address && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {organization.address}
              </p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Code:</span>
            <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800">
              {organization?.code}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Type:</span>
            <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              {organization?.type?.name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Type Description:</span>
            <span className="text-sm text-gray-700">{organization?.type?.description}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Description:</span>
            <span className="text-sm text-gray-700">{organization?.description}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Status:</span>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                organization?.isActive ? "bg-[#bfffda] text-green-800" : "bg-rose-200 text-rose-700"
              }`}
            >
              {organization?.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Created At:</span>
            <span className="text-sm text-gray-700">
              {organization?.createdAt && new Date(organization.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Updated At:</span>
            <span className="text-sm text-gray-700">
              {organization?.updatedAt && new Date(organization.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}