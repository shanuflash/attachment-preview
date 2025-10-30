import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import PasswordModal from './components/PasswordModal';

import { pdfjs, Document, Page, Thumbnail } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const PageWrapper = ({
  loading = true,
  key = '',
  pageNumber = 1,
  width = 800,
  setPageNumber,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView && loading) return;
    setPageNumber(pageNumber);
  }, [loading, pageNumber, inView]);

  return (
    <div ref={ref}>
      <Page key={key} pageNumber={pageNumber} width={width} />
    </div>
  );
};

const Pdf = ({ data = {}, onClose = () => {} }) => {
  const passwordRef = useRef({
    value: '',
    callback: () => {},
  });

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
    setLoading(false);
  };

  useEffect(() => {
    const thumbnail = document?.getElementById(`pdf-thumbnail-${pageNumber}`);
    thumbnail?.scrollIntoView({ block: 'nearest' });
  }, [pageNumber]);

  useEffect(() => {
    if (loading) return;
    setTimeout(() => {
      setPageNumber(1);
    }, 500);
  }, [loading, numPages]);

  return (
    <div className="flex justify-center h-full w-full relative">
      <PasswordModal
        {...{
          passwordModal,
          setPasswordModal,
          passwordRef,
          passwordError,
          setPasswordError,
          onClose,
        }}
      />
      <div className="flex items-center flex-col w-full">
        <div className="relative h-full w-full [&_.react-pdf__Document]:w-full [&_.react-pdf__Document]:h-full [&_.react-pdf__Document]:flex [&_.react-pdf__Document]:flex-col [&_.react-pdf__Document]:items-center [&_.react-pdf__Page]:my-4 [&_.react-pdf__Page_*]:font-[initial]! [&_.react-pdf__message]:p-10 [&_.react-pdf__Thumbnail_*]:font-[initial]!">
          <Document
            file={data?.url}
            onLoadSuccess={onDocumentLoadSuccess}
            error="Failed to load PDF"
            onPassword={(callback, reason) => {
              setPasswordModal(true);
              passwordRef.current.callback = callback;
              if (reason === 2) setPasswordError(true);
            }}
            loading={
              <div
                id="pdf-viewer-loader"
                className="flex items-center justify-center absolute z-3 h-full"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            }
          >
            <div className="flex h-full w-full pt-1 gap-18">
              <div className="flex flex-col shrink-0 gap-12 pt-44 px-4 pl-12.5 scroll-pt-44 scroll-pb-10 overflow-y-scroll scrollbar-none [&::-webkit-scrollbar]:hidden">
                {Array.from(new Array(numPages), (_el, index) => (
                  <div
                    key={`thumbnail-${index + 1}`}
                    id={`pdf-thumbnail-${index + 1}`}
                    className={`flex flex-col items-center gap-3 [&_.react-pdf__Thumbnail]:border-3 [&_.react-pdf__Thumbnail]:border-transparent ${
                      pageNumber === index + 1
                        ? '[&_.react-pdf__Thumbnail]:border-primary!'
                        : ''
                    }`}
                  >
                    <Thumbnail
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={156}
                      onItemClick={({ pageNumber }) => {
                        const page = document?.querySelector(
                          `.react-pdf__Page[data-page-number="${pageNumber}"]`
                        );
                        if (!page) return;
                        page.scrollIntoView({ behavior: 'instant' });
                        setPageNumber(pageNumber);
                      }}
                    />
                    <h4 className="font-bold text-white">{index + 1}</h4>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 scroll-pt-40 pt-40 mx-auto overflow-y-scroll scrollbar-none [&::-webkit-scrollbar]:hidden">
                <div className="flex flex-col">
                  {Array.from(new Array(numPages), (_el, index) => (
                    <PageWrapper
                      loading={loading}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={800}
                      setPageNumber={setPageNumber}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
};

export default Pdf;
