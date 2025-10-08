"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IContactMessage } from "./types";
import { format } from "date-fns";
import { Mail, User, Building2, MessageSquare } from "lucide-react";

interface CreateUpdatePageSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: IContactMessage;
}

export default function CreateUpdatePageSectionModal({
  isOpen,
  onClose,
  initialValues,
}: CreateUpdatePageSectionModalProps) {
  if (!initialValues) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-[600px] w-full rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Message Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2 text-gray-700">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <User className="text-gray-500" size={18} />
            <div>
              <p className="font-medium text-gray-900">
                {initialValues.firstName} {initialValues.lastName}
              </p>
              <p className="text-sm text-gray-500">ID: {initialValues.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <Mail className="text-gray-500" size={18} />
            <div>
              <p className="text-sm text-gray-900">{initialValues.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <Building2 className="text-gray-500" size={18} />
            <div>
              <p className="text-sm text-gray-900">
                {initialValues.organization}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-b border-gray-200 pb-3">
            <MessageSquare className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="text-sm text-gray-900 font-medium mb-1">
                {initialValues.subject}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {initialValues.message}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
            <p>
              Created:{" "}
              {format(new Date(initialValues.createdAt), "dd MMM yyyy, hh:mm a")}
            </p>
            <p>
              Updated:{" "}
              {format(new Date(initialValues.updatedAt), "dd MMM yyyy, hh:mm a")}
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full px-6"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
