'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';

if (typeof window !== 'undefined') {
  // safe to use window here
  const url = window.location.href;

}

// Configure PDF.js worker to use exact version

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfView = ({url}: {url: string}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setError('No PDF URL provided');
      setIsLoading(false);
      return;
    }

    const fetchPdf = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setPdfUrl(blobUrl);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching PDF:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdf();

    return () => {
      // Cleanup blob URL when component unmounts or URL changes
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setPageLoading(false);
  }

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPage = Math.min(Math.max(1, prevPageNumber + offset), numPages);
      if (newPage !== prevPageNumber) {
        setPageLoading(true);
      }
      return newPage;
    });
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading PDF: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      {isLoading ? (
        <div className='flex justify-between w-full'>
          <div className='w-full h-96 bg-gray-200 animate-pulse rounded-md'>
            Loading PDF document...
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={pageLoading}
            >
              Zoom Out
            </button>
            <button
              onClick={() => setScale(s => Math.min(2, s + 0.1))}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={pageLoading}
            >
              Zoom In
            </button>
            <button
              onClick={() => setRotation(r => r + 90)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={pageLoading}
            >
              Rotate
            </button>
          </div>
          
          <div className="relative w-full h-[800px]">
            {pageLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-80">
                <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
                  Loading page...
                </div>
              </div>
            )}
            {pdfUrl && (
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => {
                  console.error('Error loading PDF:', error);
                  setError(error.message);
                  setIsLoading(false);
                  setPageLoading(false);
                }}
                loading={
                  <div className="w-full h-96 flex items-center justify-center">
                    Loading PDF document...
                  </div>
                }
              >
                {numPages > 0 && (
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotation}
                    onRenderSuccess={() => setPageLoading(false)}
                    onRenderError={() => {
                      setPageLoading(false);
                      setError('Error rendering page');
                    }}
                    loading={
                      <div className="w-full h-96 flex items-center justify-center">
                        Loading page...
                      </div>
                    }
                    height={800}
                  />
                )}
              </Document>
            )}
          </div>

          {numPages > 0 && (
            <div className="flex items-center gap-4 mt-4">
              <button
                disabled={pageNumber <= 1 || pageLoading}
                onClick={() => changePage(-1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <button
                disabled={pageNumber >= numPages || pageLoading}
                onClick={() => changePage(1)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PdfView;