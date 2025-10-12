"use client";
import { Button } from "@/components/ui/button";
import { useGet } from "@/hooks/useGet";
import { Link } from "@/i18n/navigation";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import EditContactInformation from "./EditContactInformation";
import { IContactInformation } from "./types/interface";

export default function ContactInformation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGet<IContactInformation>(
    "/contact-information",
    ["contact-information"]
  );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
      </div>
    );
  }
  const contactData = data?.data;
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 space-y-6 ">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Contact Information
        </h2>
        <Button
            onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          <Pencil className="w-4 h-4" /> Edit
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Contacts</h3>
          <ul className="space-y-1">
            {contactData?.contacts?.map((c, i: number) => (
              <li key={i} className="text-sm text-gray-600">
                {c.name} — <span className="italic">{c.designation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Emails */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Emails</h3>
          <ul className="space-y-1">
            {contactData?.emails?.map((e, i: number) => (
              <li key={i} className="text-sm text-gray-600">
                {e.type}: <span className="text-blue-600">{e.email}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phones */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Phones</h3>
          <ul className="space-y-1">
            {contactData?.phones?.map((p, i: number) => (
              <li key={i} className="text-sm text-gray-600">
                {p.type}: <span>{p.phone}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Addresses */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Addresses</h3>
          <ul className="space-y-1">
            {contactData?.addresses?.map((a, i: number) => (
              <li key={i} className="text-sm text-gray-600">
                {a.type}: {a.address}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Office Hours</h3>
        <p className="text-sm text-gray-600">{contactData?.officeHours}</p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Social Links</h3>
        <div className="flex gap-3 flex-wrap text-blue-600 text-sm">
          <Link href={contactData?.facebookUrl ?? "#"}>Facebook</Link>
          <Link href={contactData?.twitterUrl ?? "#"}>Twitter</Link>
          <Link href={contactData?.linkedinUrl ?? "#"}>LinkedIn</Link>
          <Link href={contactData?.websiteUrl ?? "#"}>Website</Link>
        </div>
      </div>
      <EditContactInformation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialValues={contactData}
      />
    </div>
  );
}
