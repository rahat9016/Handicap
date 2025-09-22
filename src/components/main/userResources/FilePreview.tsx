import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

const PdfPreviewComponent = ({ filePath }: { filePath: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfModule, setPdfModule] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPdfModule = async () => {
      try {
        const { Document, Page, pdfjs } = await import('react-pdf');
        
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
        
        setPdfModule({ Document, Page });
      } catch (err) {
        console.error('Failed to load PDF module:', err);
        setError(true);
      }
    };

    loadPdfModule();
  }, []);

  if (error) {
    return (
      <div className="w-full h-[150px] flex items-center justify-center bg-gray-100 border rounded">
        <div className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-sm text-gray-600 mt-2">PDF Preview Unavailable</p>
        </div>
      </div>
    );
  }

  if (!pdfModule) {
    return (
      <div className="w-full h-[150px] flex items-center justify-center bg-gray-100 border rounded">
        <div className="text-sm text-gray-500">Loading PDF preview...</div>
      </div>
    );
  }

  const { Document, Page } = pdfModule;

  return (
    <div className="w-full flex justify-center bg-gray-100 rounded">
      <Document
        file={filePath}
        loading={<div className="text-sm text-gray-500 p-4">Loading PDF...</div>}
        error={
          <div className="w-full h-[150px] flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-sm text-gray-600 mt-2">PDF Document</p>
            </div>
          </div>
        }
        className="flex justify-center"
      >
        <Page
          pageNumber={1}
          width={120}
          height={150}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

export default PdfPreviewComponent;