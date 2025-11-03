import { useState, useEffect } from 'react';
import { pdfjs, Document, Page, Thumbnail } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Loader2, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  '../lib/pdf.worker.min.mjs',
  import.meta.url
).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pdf = ({ data = {} }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [passwordState, setPasswordState] = useState({
    isOpen: false,
    hasError: false,
    value: '',
    callback: null,
  });

  useEffect(() => {
    setPasswordState({
      isOpen: false,
      hasError: false,
      value: '',
      callback: null,
    });
    setNumPages(null);
    setPageNumber(1);
  }, [data?.id, data?.url]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onThumbnailClick({ pageNumber: clickedPage }) {
    setPageNumber(clickedPage);
    const pageElement = document.querySelector(
      `.react-pdf__Page[data-page-number="${clickedPage}"]`
    );
    if (pageElement) {
      pageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="w-full h-full flex relative">
      {passwordState.isOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-neutral-900 text-white p-8 w-[465px] rounded-2xl shadow-2xl border border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (passwordState.callback) {
                passwordState.callback(passwordState.value);
              }
              setPasswordState((prev) => ({
                ...prev,
                isOpen: false,
                hasError: false,
              }));
            }}
          >
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Lock className="h-6 w-6 text-white/90" />
              </div>
              <h3 className="text-lg font-semibold mt-6">Password Protected</h3>
              <p className="text-sm text-white/60 mt-1">
                This PDF is password protected. Please enter the password to
                view.
              </p>
              <div className="w-full mt-6">
                <Input
                  type="password"
                  placeholder="Enter password"
                  autoFocus
                  value={passwordState.value}
                  className={`h-11 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 ${
                    passwordState.hasError
                      ? 'border-red-500 focus-visible:ring-red-500/30'
                      : ''
                  }`}
                  onChange={(e) => {
                    setPasswordState((prev) => ({
                      ...prev,
                      value: e.target.value,
                      hasError: false,
                    }));
                  }}
                />
                {passwordState.hasError && (
                  <p className="text-red-400 text-xs mt-2">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full h-11 bg-white text-neutral-900 hover:bg-white/90 transition-all active:scale-[0.97]"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}

      <Document
        file={data?.url}
        onLoadSuccess={onDocumentLoadSuccess}
        onPassword={(callback, reason) => {
          setPasswordState({
            isOpen: true,
            hasError: reason === 2,
            value: '',
            callback,
          });
        }}
        loading={
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="h-12 w-12 animate-spin" />
          </div>
        }
        error={
          <div className="flex items-center justify-center w-full h-full text-white">
            <p>Failed to load PDF file.</p>
          </div>
        }
        className="w-full h-full flex [&_.react-pdf__message]:w-full"
      >
        <div className="shrink-0 w-52 h-full overflow-y-auto overflow-x-hidden bg-gray-800 p-4 space-y-4 pt-20 pb-4 scroll-pt-44 scroll-pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-300">
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <div
                key={`thumb_${index + 1}`}
                className={`cursor-pointer border-2 transition-colors ${
                  pageNumber === index + 1
                    ? 'border-primary'
                    : 'border-transparent hover:border-gray-400'
                }`}
                onClick={() => onThumbnailClick({ pageNumber: index + 1 })}
              >
                <Thumbnail pageNumber={index + 1} width={160} />
                <p className="text-center text-white text-sm mt-1">
                  {index + 1}
                </p>
              </div>
            ))}
        </div>

        <div className="flex-1 h-full overflow-y-auto overflow-x-hidden bg-gray-700 flex flex-col items-center py-8 px-4 pt-20 pb-4 scroll-pt-44 scroll-pb-10 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-300">
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="mb-4">
                <Page
                  pageNumber={index + 1}
                  width={Math.min(800, window.innerWidth - 250)}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </div>
            ))}
        </div>
      </Document>
    </div>
  );
};

export default Pdf;
