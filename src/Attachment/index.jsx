import {
  Box,
  Flex,
  Text,
  IconButton,
  Tooltip,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@sparrowengg/twigs-react';
import {
  PlayFillIcon,
  EllipsisVerticalIcon,
} from '@sparrowengg/twigs-react-icons';
import React, { useState, useEffect, useMemo } from 'react';
import SingleAttachmentThumbnail from './SingleType';
import File from './Common/File';
import Videos from './SingleType/Components/Videos';
import MultipleTypeAttachment from './MultipleType';
import { motion, AnimatePresence } from 'framer-motion';
import { DownFilledArrowIcon } from './Common/Icons';
import { Image, Pdf, Video, Audio, Unsupported } from './Preview';

const createThumbnail = async ({ url }) => {
  const width = 320;
  const height = 180;
  const video = document.createElement('video');
  video.src = url || '';
  video.crossOrigin = 'anonymous';

  return new Promise((resolve, reject) => {
    video.onloadedmetadata = () => {
      video.currentTime = 1;
    };
    video.onseeked = () => {
      const canvas = document.createElement('canvas');

      //OPTIMIZE SIZE LATER !!!
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      //OPTIMIZE SIZE LATER !!!

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailURL = canvas.toDataURL('image/jpeg');
        resolve(thumbnailURL);
      }
    };
    video.onerror = (error) => {
      reject(new Error('Error loading the video', error));
    };
    video.load();
  });
};

const Attachment = ({ files = [], collapsible = false }) => {
  const [attachments, setAttachments] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [videoThumbnails, setVideoThumbnails] = useState([]);

  const [open, setOpen] = useState({
    image: false,
    pdf: false,
    video: false,
    audio: false,
    unsupported: false,
  });

  const [currentData, setCurrentData] = useState(null);

  const groupAttachmentsbyType = (attachments = []) => {
    const groupedAttachments = attachments?.reduce(
      (acc, attachment) => {
        if (attachment.type.includes('image')) {
          acc.images.push(attachment);
        } else if (attachment.type.includes('video')) {
          acc.videos.push(attachment);
        } else if (attachment.type.includes('audio')) {
          acc.audios.push(attachment);
        } else {
          acc.others.push(attachment);
        }
        return acc;
      },
      { images: [], videos: [], audios: [], others: [] }
    );

    setAttachments(groupedAttachments || []);
  };

  useEffect(() => {
    groupAttachmentsbyType(files);
  }, [files]);

  const isSingleAttachment = useMemo(() => {
    if (attachments.length === 0) return false;

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
  }, [attachments]);

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
                }}
              />
            ) : (
              <MultipleTypeAttachment
                {...{ attachments, videoThumbnails, setCurrentData, setOpen }}
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
            open={open?.image}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, image: false }));
            }}
          />
        )}
        {open?.video && (
          <Video
            data={currentData}
            open={open?.video}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, video: false }));
            }}
          />
        )}
        {open?.pdf && (
          <Pdf
            data={currentData}
            open={open?.pdf}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, pdf: false }));
            }}
          />
        )}
        {open?.audio && (
          <Audio
            data={currentData}
            open={open?.audio}
            onClose={() => {
              setCurrentData(null);
              setOpen((prev) => ({ ...prev, audio: false }));
            }}
          />
        )}
        {open?.unsupported && (
          <Unsupported
            data={currentData}
            open={open?.unsupported}
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

export default Attachment;
