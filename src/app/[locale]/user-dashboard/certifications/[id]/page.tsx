"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { CertificateTemplate } from "@/components/UserDashboard/Certifications/CertificateTemplate/CertificateTemplate";
import { ICertificate } from "@/components/UserDashboard/Certifications/types/courseCertificate";
import { useGet } from "@/hooks/useGet";
import { useParams } from "next/navigation";

export default function CertificatePage() {
  const { id } = useParams();
  const { data, isLoading: loading } = useGet<ICertificate>(
    `/certificates/${id}`,
    ["", String(id)]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--certificate-gold)] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your certificate...</p>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Certificate not found</p>
        </div>
      </div>
    );
  }

  const handleDownload = async () => {
  const element = document.getElementById("certificate-content");
  if (!element) {
    console.error("Certificate element not found");
    return;
  }

  try {
    // Render DOM element to canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher = sharper PDF
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);

    // --- Create true A4 landscape PDF ---
    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();  // 297mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm

    // Scale image to fit A4 page
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;

    const x = (pdfWidth - newWidth) / 2;
    const y = (pdfHeight - newHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, newWidth, newHeight);
    pdf.save("certificate.pdf");
  } catch (error) {
    console.error("PDF generation failed:", error);
  }
};

  // const handleDownload = async () => {
  //   const element = document.getElementById("certificate-content");
  //   if (!element) {
  //     console.error("Certificate element not found");
  //     return;
  //   }

  //   try {
  //     const canvas = await html2canvas(element, {
  //       scale: 2,
  //       useCORS: true,
  //       width: 1820,
  //       height: 752,
  //       windowWidth: 1820,
  //       windowHeight: 752,
  //     });

  //     const imgData = canvas.toDataURL("image/png", 1.0);

  //     // --- A4 in landscape mode ---
  //     const pdf = new jsPDF("landscape", "px", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;

  //     // Scale image so it ALWAYS covers the whole A4 page
  //     const ratio = Math.max(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const newWidth = imgWidth * ratio;
  //     const newHeight = imgHeight * ratio;

  //     // Center the image (cropping if needed)
  //     const x = (pdfWidth - newWidth) / 2;
  //     const y = (pdfHeight - newHeight) / 2;

  //     pdf.addImage(imgData, "PNG", x, y, newWidth, newHeight);

  //     // ✅ Always outputs true A4 landscape
  //     pdf.save("certificate.pdf");
  //   } catch (error) {
  //     console.error("PDF generation failed:", error);
  //   }
  // };

  return (
    <div className="min-h-[65vh] bg-white">
      {data?.data && (
        <>
          <button
            onClick={handleDownload}
            className="px-6 py-2 bg-dashboard-primary mb-2 text-white rounded-lg shadow"
          >
            Download PDF
          </button>
          <div>
            <CertificateTemplate information={data?.data} />
          </div>
        </>
      )}
    </div>
  );
}
