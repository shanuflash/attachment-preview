import React, {
  useEffect, useMemo, useRef, useState 
} from 'react';
import {
  Flex,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Tooltip,
} from '@sparrowengg/twigs-react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@sparrowengg/twigs-react-icons';
import Header from './Components/Header';
import { I18n } from 'react-redux-i18n';

import Image from './Image';
import Video from './Video';
import Pdf from './Pdf';
import Unsupported from './Unsupported';
import { getAttachmentType } from '../Common/helpers';
import { previewTypes } from '../Common/constants';

const Preview = ({
  data = [],
  activeId = 0,
  onClose = () => {},
  handleDownload,
}) => {
  const containerRef = useRef(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    setCurrentData(data.find((data) => data.id === activeId));
  }, [activeId]);

  const {
    prevFileExists, nextFileExists, prevFileIndex, nextFileIndex 
  } =
    useMemo(() => {
      const currentIndex = data.findIndex(
        (data) => data?.id === currentData?.id
      );
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;
      return {
        prevFileExists: prevIndex >= 0,
        nextFileExists: nextIndex < data.length,
        prevFileIndex: prevIndex,
        nextFileIndex: nextIndex,
      };
    }, [currentData?.id, data]);

  const fileType = useMemo(() => {
    if (currentData?.type) {
      return getAttachmentType(currentData?.type);
    }
    return null;
  }, [currentData?.type]);

  return (
    <Dialog open>
      <DialogContent
        className="dm-sans sparrow-attachments-preview"
        onEscapeKeyDown={onClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={onClose}
        css={{
          padding: 0,
          width: '90vw',
          minHeight: '90vh',
          height: '90vh',
          borderRadius: '$2xl',
          overflow: 'hidden',
          backgroundColor: '$black900',
          ...(fileType === previewTypes.pdf && {
            backgroundColor: '#808080',
          }),
        }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          css={{
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
          ref={containerRef}
        >
          <Header
            {...{
              currentData,
              onClose,
              handleDownload,
              css: fileType === previewTypes.pdf && {
                background: '$neutral800',
              },
              showDownload:
                fileType === previewTypes.unsupported ? false : true,
            }}
          />
          <>
            {fileType === previewTypes.image && <Image data={currentData} />}
            {fileType === previewTypes.video && <Video data={currentData} />}
            {fileType === previewTypes.pdf && <Pdf data={currentData} />}
            {fileType === previewTypes.unsupported && (
              <Unsupported data={currentData} handleDownload={handleDownload} />
            )}
          </>
          <>
            {prevFileExists && (
              <Box
                css={{
                  zIndex: 3,
                  position: 'absolute',
                  left: '$12',
                }}
              >
                <Tooltip
                  className="dm-sans"
                  content={I18n.t('attachments.image.previous')}
                  sideOffset={4}
                >
                  <IconButton
                    id="image-viewer-prev-image"
                    size="xl"
                    css={{
                      borderRadius: '$round',
                      background: 'white !important',
                    }}
                    color="bright"
                    icon={<ChevronLeftIcon strokeWidth={1.8} size={32} />}
                    onClick={() => {
                      setCurrentData(data[prevFileIndex]);
                    }}
                  />
                </Tooltip>
              </Box>
            )}
            {nextFileExists && (
              <Box
                css={{
                  zIndex: 3,
                  position: 'absolute',
                  right: '$12',
                }}
              >
                <Tooltip
                  className="dm-sans"
                  content={I18n.t('attachments.image.next')}
                  sideOffset={4}
                >
                  <IconButton
                    id="image-viewer-next-image"
                    size="xl"
                    css={{
                      borderRadius: '$round',
                      background: 'white !important',
                    }}
                    color="bright"
                    icon={<ChevronRightIcon strokeWidth={1.8} size={32} />}
                    onClick={() => {
                      setCurrentData(data[nextFileIndex]);
                    }}
                  />
                </Tooltip>
              </Box>
            )}
          </>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
