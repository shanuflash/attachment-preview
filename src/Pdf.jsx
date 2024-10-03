import React, { useEffect } from 'react';
import { pdfjs, Document, Page, Outline, Thumbnail } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {
  Box,
  CircleLoader,
  Dialog,
  DialogContent,
  dialogs,
  Flex,
  Input,
  Text,
  Button,
} from '@sparrowengg/twigs-react';
import Header from './components/Header';
import { useInView } from 'react-intersection-observer';
import PasswordModal from './components/PasswordModal';

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
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView && loading) return;
    console.log('Page in view:', pageNumber);
    setPageNumber(pageNumber);
  }, [loading, pageNumber, inView]);

  return (
    <Box ref={ref}>
      <Page key={key} pageNumber={pageNumber} width={width} />
    </Box>
  );
};

const Pdf = ({ open, data, onClose }) => {
  const passwordRef = React.useRef({
    value: '',
    callback: () => {},
  });

  const [currentData, setCurrentData] = React.useState(null);
  const [numPages, setNumPages] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [passwordModal, setPasswordModal] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
    setLoading(false);
  };

  // const handlePassword = (callback) => {
  //   dialogs.open({

  // };

  React.useEffect(() => {
    if (!open) return;
    setCurrentData(data);
  }, [data, open]);

  React.useEffect(() => {
    if (!open) return;
    const thumbnail = document?.getElementById(`pdf-thumbnail-${pageNumber}`);
    thumbnail?.scrollIntoView({ block: 'nearest' });
  }, [pageNumber, open]);

  return (
    <Dialog open={open}>
      <DialogContent
        onEscapeKeyDown={onClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
        css={{
          backgroundColor: '$white900',
          padding: 0,
          width: '100%',
          height: '100%',
          borderRadius: '$2xl',
          overflow: 'hidden',
        }}
      >
        <Flex
          justifyContent="center"
          css={{
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          <Box
            id="pdf-viewer-bg"
            css={{
              zIndex: 0,
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: '$black700',
            }}
          />
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
          <Header currentData={data} onClose={onClose} />
          <Flex
            alignItems="center"
            flexDirection="column"
            css={{ width: '100%' }}
          >
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
                },

                '& .react-pdf__message': {
                  padding: '$10',
                },
              }}
            >
              <Document
                file={currentData?.src}
                onLoadSuccess={(numPages) => {
                  onDocumentLoadSuccess(numPages);
                }}
                error="Failed to load PDF"
                onPassword={(callback, reason) => {
                  setPasswordModal(true);
                  console.log(passwordRef.current.callback);
                  passwordRef.current.callback = callback;
                  if (reason === 1) {
                    console.log('need password');
                  } else if (reason === 2) {
                    setPasswordError(true);
                  }
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
                  }}
                  gap="$18"
                >
                  <Flex
                    flexDirection="column"
                    shrink={0}
                    gap="$12"
                    css={{
                      padding: '$44 $16 0 $16',
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
                          onItemClick={({ dest, pageIndex, pageNumber }) => {
                            const page = document?.querySelector(
                              `.react-pdf__Page[data-page-number="${pageNumber}"]`
                            );
                            if (!page) return;
                            page.scrollIntoView({ behavior: 'instant' });
                            setPageNumber(pageNumber);
                          }}
                        />
                        <Text as="h4" weight="bold">
                          {index + 1}
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                  <Flex
                    flexDirection="column"
                    gap="$2"
                    css={{
                      scrollPaddingTop: '$36',
                      paddingTop: '$32',
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
      </DialogContent>
    </Dialog>
  );
};

export default Pdf;
