import {
  Box, Flex, Text, useMountTransition 
} from '@sparrowengg/twigs-react';
import React, { useState, useEffect } from 'react';
import SingleAttachmentThumbnail from './SingleType';
import MultipleTypeAttachment from './MultipleType';
import DownFilledArrowIcon from './Common/Icons/DownFilledArrowIcon';
import Preview from './Preview';
import { I18n } from 'react-redux-i18n';
import { createThumbnail } from './Common/helpers';
import { previewTypes } from './Common/constants';

/**
 * Attachments component for displaying file attachments
 *
 * @param {Object[]} files - [REQUIRED] Array of attachment objects
 * @param {string} files[].id - Unique identifier for the attachment
 * @param {string} files[].name - Name of the file
 * @param {string} files[].type - MIME type of the file (e.g. 'video/mp4', 'image/jpeg')
 * @param {string} files[].url - URL to access the file
 * @param {string} files[].created_at - ISO timestamp of when file was created
 * @param {Object} files[].properties - Additional file properties
 * @param {number} files[].properties.size - Size of file in bytes
 * @param {Object} files[].uploadedBy - User who uploaded the file
 * @param {string} files[].uploadedBy.name - Name of uploader
 * @param {string} files[].uploadedBy.image - Avatar URL of uploader
 * @param {boolean} [collapsible=false] - [OPTIONAL] Whether attachments section can be collapsed, defaults to false
 * @param {boolean} [mini=false] - [OPTIONAL] Whether to show minimal view (as chips), defaults to false
 * @param {Function} handleDownload - [OPTIONAL] download handler, defaults to downloading from url
 * @returns {React.ReactElement} - React component
 */

const Attachments = ({
  files = [],
  collapsible = false,
  mini = false,
  handleDownload = null,
}) => {
  const [attachments, setAttachments] = useState(files);
  const [attachmentsWithoutAudio, setAttachmentsWithoutAudio] = useState([]);
  const [videos, setVideos] = useState([]);

  const [activeId, setActiveId] = useState(0);
  const [isSingleAttachment, setIsSingleAttachment] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const shouldRenderAttachments = useMountTransition(!isCollapsed, 500);

  const fetchThumbnails = async (videos) => {
    try {
      if (!videos || videos.length === 0) {
        return;
      }
      setVideos(videos);
      const promises = await Promise.allSettled(
        videos?.map(({ url }) => createThumbnail({ url }))
      );
      const thumbnails = promises
        .filter(({ status }) => status === 'fulfilled')
        .map(({ value }) => value);

      const videosWithThumbnails = videos.map((video, index) => ({
        ...video,
        thumbnail: thumbnails[index] || null,
      }));

      setVideos(videosWithThumbnails);
    } catch (error) {
      console.error('Error creating thumbnails', error);
    }
  };

  const handleTypeCheck = (attachments = [], mini) => {
    if (!attachments?.length) return false;
    if (mini) return true;

    const groupedAttachments = attachments.reduce((acc, attachment) => {
      const type = attachment.type.split('/')[0];
      const key =
        type === previewTypes.image ||
        type === previewTypes.video ||
        type === previewTypes.audio
          ? type
          : previewTypes.other;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const nonEmptyTypes = Object.keys(groupedAttachments);
    return nonEmptyTypes.length === 1 ? nonEmptyTypes[0] : false;
  };

  useEffect(() => {
    if (!mini && files.length) {
      setAttachments(
        files.sort((a, _) =>
          a.type.split('/')[0] === previewTypes.video ? -1 : 1
        )
      );
      setAttachmentsWithoutAudio(
        files.filter(
          (attachment) => attachment.type.split('/')[0] !== previewTypes.audio
        )
      );
      const videos = files.filter(
        (attachment) => attachment.type.split('/')[0] === previewTypes.video
      );
      fetchThumbnails(videos);
    }
    setIsSingleAttachment(handleTypeCheck(files, mini));
  }, [files]);

  useEffect(() => {
    // preload unsupported background image
    const img = new Image();
    img.src =
      'https://ss-staging-public.s3.us-east-1.amazonaws.com/static/ticket-management/unsupported-file.webp';
  }, []);

  if (!files.length) return null;

  return (
    <Flex className="sparrow-attachments" flexDirection="column">
      {collapsible && (
        <Flex
          onClick={() => setIsCollapsed((prev) => !prev)}
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
            {files.length === 1
              ? isCollapsed
                ? files[0]?.name
                : files[0]?.name?.split('.')?.pop()?.toUpperCase()
              : `${files?.length} ${I18n.t('attachments.files')}`}
          </Text>
          <Flex
            className="arrow"
            css={{
              display: 'inline-flex',
              transition: 'transform 0.1s ease',
              transform: !isCollapsed ? 'rotate(0deg)' : 'rotate(-90deg)',
            }}
          >
            <DownFilledArrowIcon />
          </Flex>
        </Flex>
      )}

      <Box
        css={{
          overflow: 'hidden',
          maxHeight: isCollapsed ? '0px' : '3300px',
          opacity: isCollapsed ? 0 : 1,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {shouldRenderAttachments && (
          <Box>
            {isSingleAttachment ? (
              <SingleAttachmentThumbnail
                type={isSingleAttachment}
                setOpen={(id) => {
                  setActiveId(id);
                  setOpen(true);
                }}
                {...{
                  attachments,
                  videos,
                  handleDownload,
                  mini,
                }}
              />
            ) : (
              <MultipleTypeAttachment
                setOpen={(id) => {
                  setActiveId(id);
                  setOpen(true);
                }}
                {...{
                  attachments,
                  videos,
                  handleDownload,
                }}
              />
            )}
          </Box>
        )}
      </Box>

      {open && (
        <Preview
          data={attachmentsWithoutAudio}
          activeId={activeId}
          onClose={() => {
            setOpen(false);
            setActiveId(0);
          }}
          handleDownload={handleDownload}
        />
      )}
    </Flex>
  );
};

export default Attachments;
