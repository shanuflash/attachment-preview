import React, { useEffect, useRef, useState } from 'react';
import {
  Box, CircleLoader, Flex, Text 
} from '@sparrowengg/twigs-react';
import { useInView } from 'react-intersection-observer';
import PasswordModal from './Components/PasswordModal';

import {
  pdfjs, Document, Page, Thumbnail 
} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

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
    <Box ref={ref}>
      <Page key={key} pageNumber={pageNumber} width={width} />
    </Box>
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
    <Flex
      justifyContent="center"
      css={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* <Box
        id="pdf-viewer-bg"
        css={{
          zIndex: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      /> */}
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
      <Flex alignItems="center" flexDirection="column" css={{ width: '100%' }}>
        <Box
          css={{
            position: 'relative',
            height: '100%',
            width: '100%',
            '& .react-pdf__Document': {
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },

            '& .react-pdf__Page': {
              margin: '$4 0 $4 0',
              '& *': {
                fontFamily: 'initial !important',
              },
            },

            '& .react-pdf__message': {
              padding: '$10',
            },

            '& .react-pdf__Thumbnail *': {
              fontFamily: 'initial !important',
            },
          }}
        >
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
              <Flex
                id="pdf-viewer-loader"
                alignItems="center"
                justifyContent="center"
                css={{
                  position: 'absolute',
                  zIndex: 3,
                  height: '100%',
                }}
              >
                <CircleLoader color="bright" size="3xl" />
              </Flex>
            }
          >
            <Flex
              css={{
                height: '100%',
                width: '100%',
                paddingTop: '$1',
              }}
              gap="$18"
            >
              <Flex
                flexDirection="column"
                shrink={0}
                gap="$12"
                css={{
                  padding: '$44 $16 0 $50',
                  scrollPaddingTop: '$44',
                  scrollPaddingBottom: '$10',
                  overflowY: 'scroll',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {Array.from(new Array(numPages), (_el, index) => (
                  <Flex
                    id={`pdf-thumbnail-${index + 1}`}
                    flexDirection="column"
                    alignItems="center"
                    gap="$3"
                    css={{
                      '& .react-pdf__Thumbnail': {
                        border: '3px solid transparent',
                      },
                      ...(pageNumber === index + 1 && {
                        '& .react-pdf__Thumbnail': {
                          border: '3px solid $primary400',
                        },
                      }),
                    }}
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
                    <Text as="h4" weight="bold" css={{ color: '$white900' }}>
                      {index + 1}
                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Flex
                flexDirection="column"
                gap="$2"
                css={{
                  scrollPaddingTop: '$40',
                  paddingTop: '$40',
                  marginInline: 'auto',
                  overflowY: 'scroll',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <Flex flexDirection="column">
                  {Array.from(new Array(numPages), (_el, index) => (
                    <PageWrapper
                      loading={loading}
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={800}
                      setPageNumber={setPageNumber}
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>
          </Document>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Pdf;
