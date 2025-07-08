// import { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// // Set the worker source
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function PDFViewer({ file }) {
//     console.log(file)
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div className="flex justify-center">
//       <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} width={600} />
//       </Document>
//       <p className="text-center mt-2">
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// }
