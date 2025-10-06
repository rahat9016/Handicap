"use client";

import { useGet } from "@/hooks/useGet";
import { ICertificate } from "../types/courseCertificate";
import { CertificateCardSkeleton } from "./CertificateCardSkeleton";
import { CourseCertificate } from "./CourseCertificate";

export default function Certifications() {
  const { data, isLoading } = useGet<ICertificate[]>(
    `/certificates/my-certificates`,
    ["course-certificates"]
  );
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, rowIndex) => (
              <CertificateCardSkeleton key={rowIndex} />
            ))
          : data?.data?.map((item, index) => (
              <CourseCertificate key={index} certificate={item} />
            ))}
      </div>
    </div>
  );
}
