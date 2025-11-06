import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGet } from "@/hooks/useGet";
import { format } from "date-fns";
import { Building2, Calendar, Mail, MessageSquare, User } from "lucide-react";
import { IContactMessage } from "./types";

export default function ViewDetails({
  isOpen,
  onClose,
  contact,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  contact?: IContactMessage;
  refetch: () => void;
}) {
  // /handicap/api/v1/contact-us/{id}/read
  useGet(`/contact-us/${contact?.id}/read`, ["contact-us"]);
  refetch();
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white min-h-[20vh] w-[80vw] md:w-[600px] overflow-y-auto rounded-2xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Contact Details
            </DialogTitle>
          </DialogHeader>

          {contact ? (
            <div className="space-y-6 mt-2 text-gray-700">
              {/* Name Section */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {contact?.firstName} {contact?.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">ID: {contact?.id}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" /> Email:
                </span>
                <span className="text-sm text-gray-800">{contact?.email}</span>
              </div>

              {/* Organization */}
              {contact?.organization && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />{" "}
                    Organization:
                  </span>
                  <span className="text-sm text-gray-800">
                    {contact?.organization}
                  </span>
                </div>
              )}

              {/* Subject & Message */}
              <div>
                <p className="text-gray-600 font-medium flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-gray-500" /> Subject:
                </p>
                <p className="text-sm text-gray-900 font-medium">
                  {contact?.subject}
                </p>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed border-l-2 border-primary pl-3">
                  {contact?.message}
                </p>
              </div>

              {/* Timestamps */}
              <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                <p className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {contact?.createdAt &&
                    format(
                      new Date(contact?.createdAt),
                      "dd MMM yyyy, hh:mm a"
                    )}
                </p>
                <p className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {contact?.updatedAt &&
                    format(
                      new Date(contact?.updatedAt),
                      "dd MMM yyyy, hh:mm a"
                    )}
                </p>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="rounded-full px-6 border-gray-300 hover:bg-gray-100"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No contact details found.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
