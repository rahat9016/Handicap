"use client";

import { Award, CheckCircle } from "lucide-react";
import { ICertificate } from "../types/courseCertificate";

interface CertificateTemplateProps {
  information: ICertificate;
}

export function CertificateTemplate({ information }: CertificateTemplateProps) {

  return (
    <div>
      <div
        id="certificate-content"
        className="relative bg-white border-8 border-[#f0e6d2] rounded-lg shadow p-12"
      >
        <div className="absolute inset-4 border-2 border-[color:var(--certificate-gold)] rounded-md opacity-30"></div>
        <div className="absolute inset-6 border border-[color:var(--certificate-gold)] rounded-sm opacity-20"></div>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="h-12 w-12 text-[color:var(--certificate-gold)]" />
            <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
              CERTIFICATE
            </h1>
            <Award className="h-12 w-12 text-[color:var(--certificate-gold)]" />
          </div>
          <div className="h-1 w-32 bg-[color:var(--certificate-gold)] mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-2 font-medium tracking-widest">
            OF COMPLETION
          </p>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-700">This is to certify that</p>

          <div className="py-4">
            <h2 className="text-5xl font-bold text-gray-800 mb-2 font-serif">
              {information?.user?.firstName} {information?.user?.lastName}
            </h2>
            <div className="h-0.5 w-64 bg-gray-400 mx-auto"></div>
          </div>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            has successfully completed the course
          </p>

          <div className="py-2">
            <h3 className="text-3xl font-bold text-[color:var(--certificate-gold)] mb-2">
              {information?.course?.title}
            </h3>
            <div className="flex items-center justify-center gap-4 text-sm text-zinc-600">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Completed on {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <p className="text-base text-gray-700 mt-8">
            Awarded this certificate in recognition of the effort, dedication, 
        and demonstrated proficiency in the subject matter.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-12">
          <div className="text-center">
            <div className="h-0.5 w-32 bg-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600 font-medium">
              {information.organization.name}
            </p>
            <p className="text-xs text-gray-500">Course Provider</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[color:var(--certificate-gold)] rounded-full flex items-center justify-center mb-2">
              <Award className="h-8 w-8 text-white" />
            </div>
            <p className="text-xs text-gray-500">
              {information.organization.name || "Course Provider"}
            </p>
          </div>

          <div className="text-center">
            <div className="h-0.5 w-32 bg-gray-400 mb-2"></div>
            <p className="text-sm text-gray-600 font-medium">Certificate ID</p>
            <p className="text-xs text-gray-500 font-mono">
              {information.uniqueCode}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-4 border-t-4 border-[color:var(--certificate-gold)] opacity-30"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-r-4 border-t-4 border-[color:var(--certificate-gold)] opacity-30"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-4 border-b-4 border-[color:var(--certificate-gold)] opacity-30"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-4 border-b-4 border-[color:var(--certificate-gold)] opacity-30"></div>
      </div>
    </div>
  );
}
