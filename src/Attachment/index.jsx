import { Flex, Text } from '@sparrowengg/twigs-react';

import React, { useState, useEffect, useMemo } from 'react';
import SingleAttachmentThumbnail from './SingleType';
import MultipleTypeAttachment from './MultipleType';
import { AnimatePresence, motion } from 'framer-motion';
import { DownFilledArrowIcon } from './Common/Icons';
import { Image, Pdf, Video, Audio, Unsupported } from './Preview';

const createThumbnail = async ({ url }) => {
  const video = document.createElement('video');
  video.src = url || '';
  video.crossOrigin = 'anonymous';

  return new Promise((resolve, reject) => {
    const handleError = (error) =>
      reject(new Error('Error loading video:', error));

    const generateThumbnail = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return handleError('Canvas context not available');

      // Scale thumbnail down to 318x178
      const maxDimensions = { width: 318, height: 178 };
      const scale = Math.min(
        maxDimensions.width / video.videoWidth,
        maxDimensions.height / video.videoHeight
      );

      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg'));
    };

    video.onloadedmetadata = () => {
      video.currentTime = 1;
    };
    video.onseeked = generateThumbnail;
    video.onerror = handleError;
    video.load();
  });
};

const Attachments = ({ files = [], collapsible = false, mini = false }) => {
  const [attachments, setAttachments] = useState([]);
  const [currentData, setCurrentData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [videoThumbnails, setVideoThumbnails] = useState([]);
  const [open, setOpen] = useState({
    image: false,
    pdf: false,
    video: false,
    audio: false,
    unsupported: false,
  });

  const groupAttachmentsbyType = (attachments = []) => {
    const groupedAttachments = {
      images: [],
      videos: [],
      audios: [],
      others: [],
    };

    attachments?.forEach((attachment) => {
      const type = attachment.type.split('/')[0];
      switch (type) {
        case 'image':
          groupedAttachments.images.push(attachment);
          break;
        case 'video':
          groupedAttachments.videos.push(attachment);
          break;
        case 'audio':
          groupedAttachments.audios.push(attachment);
          break;
        default:
          groupedAttachments.others.push(attachment);
      }
    });
    setAttachments(groupedAttachments);
  };

  useEffect(() => {
    groupAttachmentsbyType(files);
  }, [files]);

  const isSingleAttachment = useMemo(() => {
    if (attachments.length === 0) return false;
    if (mini) return true;

    // Filter out empty attachment types
    const nonEmptyKeys = Object.keys(attachments).filter(
      (key) => attachments[key].length > 0
    );

    // If only one attachment type is present, return that type
    if (nonEmptyKeys.length === 1) {
      return nonEmptyKeys[0];
    }

    // If multiple attachment types are present, return false
    return false;
  }, [attachments, mini]);

  useEffect(() => {
    if (!attachments?.videos || attachments.videos.length === 0) {
      return;
    } else {
      setVideoThumbnails(Array(attachments.videos.length).fill(null));
    }

    const fetchThumbnails = async () => {
      try {
        const promises = await Promise.allSettled(
          attachments?.videos?.map(({ url }) => createThumbnail({ url }))
        );
        const thumbnails = promises
          .filter(({ status }) => status === 'fulfilled')
          .map(({ value }) => value);

        setVideoThumbnails(thumbnails);
      } catch (error) {
        console.error('Error creating thumbnails', error);
      }
    };

    fetchThumbnails();
  }, [attachments?.videos]);

  if (!files.length) return null;

  return (
    <Flex className="sparrow-attachments" flexDirection="column">
      {collapsible && (
        <Flex
          onClick={() => setIsOpen(!isOpen)}
          css={{ cursor: 'pointer', marginBottom: '$2' }}
        >
          <Text
            as="h4"
            size="xs"
            weight="medium"
            css={{
              color: '$neutral700',
            }}
          >
            {files.length === 1 ? files[0].name : `${files?.length} files`}
          </Text>
          <Flex
            className="arrow"
            css={{
              display: 'inline-flex',
              transition: 'transform 0.1s ease',
              transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
            }}
          >
            <DownFilledArrowIcon />
          </Flex>
        </Flex>
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {isSingleAttachment ? (
              <SingleAttachmentThumbnail
                type={isSingleAttachment}
                {...{
                  attachments,
                  videoThumbnails,
                  setCurrentData,
                  setOpen,
                  mini,
                }}
              />
            ) : (
              <MultipleTypeAttachment
                {...{
                  attachments,
                  videoThumbnails,
                  setCurrentData,
                  setOpen,
                }}
              />
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <>
        {open?.image && (
          <Image
            data={attachments?.images}
            active={currentData}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, image: false }));
            }}
          />
        )}
        {open?.video && (
          <Video
            data={currentData}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, video: false }));
            }}
          />
        )}
        {open?.pdf && (
          <Pdf
            data={currentData}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, pdf: false }));
            }}
          />
        )}
        {open?.audio && (
          <Audio
            data={currentData}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, audio: false }));
            }}
          />
        )}
        {open?.unsupported && (
          <Unsupported
            data={currentData}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, unsupported: false }));
            }}
          />
        )}
      </>
    </Flex>
  );
};

export default Attachments;
