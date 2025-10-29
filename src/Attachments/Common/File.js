import {
  Box, Flex, Text, IconButton, Tooltip 
} from '@sparrowengg/twigs-react';
import { DownloadIcon } from '@sparrowengg/twigs-react-icons';
import React, {
  useState, useEffect, useCallback, useRef 
} from 'react';
import { AttachmentIcons } from './Icons';
import ImageLoader from './ImageLoader';
import { downloadSrcAsFile } from './helpers';
import { fileTypes } from './constants';
import { I18n } from 'react-redux-i18n';

export const getFileIcon = (attachment, size = 40) => {
  switch (attachment?.type) {
    case fileTypes.csv:
      return <AttachmentIcons.CSV size={size} />;
    case fileTypes.xlsx:
    case fileTypes.xls:
      return <AttachmentIcons.XLS size={size} />;
    case fileTypes.docx:
    case fileTypes.doc:
      return <AttachmentIcons.DOC size={size} />;
    case fileTypes.html:
      return <AttachmentIcons.HTML size={size} />;
    case fileTypes.pdf:
      return <AttachmentIcons.PDF size={size} />;
    default:
      if (attachment?.type?.includes(fileTypes.image)) {
        return <ImageLoader src={attachment?.url} width={size} height={size} />;
      } else if (attachment?.type?.includes(fileTypes.audio)) {
        return <AttachmentIcons.AUDIO size={size} />;
      } else if (attachment?.type?.includes(fileTypes.video)) {
        return <AttachmentIcons.VIDEO size={size} />;
      } else {
        return <AttachmentIcons.FILE size={size} />;
      }
  }
};

const File = ({ attachment, setOpen, handleDownload }) => {
  const formatBytes = useCallback(
    (bytes, decimals = 2) => {
      if (!+bytes) return '0 Bytes';

      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },
    [attachment]
  );

  const fileNameRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const text = fileNameRef.current;

    if (text) {
      setIsOverflow(text.scrollWidth > text.clientWidth);
    }
  }, [attachment.id]);

  return (
    <Flex
      gap="$4"
      onClick={() => {
        setOpen(attachment?.id);
      }}
      css={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: '58px',
        width: '320px',
        border: '$borderWidths$xs solid $black200',
        background: '$white900',
        borderRadius: '$xl',
        padding: '$4',
        overflow: 'hidden',

        '& .hover-text, & .default-text': {
          position: 'absolute',
          top: 0,
          left: 0,
        },
        '& .hover-text': {
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '& .default-text': {
          transition: 'opacity 0.2s ease',
        },

        '&:has(.sparrow-attachments-thumbnail-actions[data-state="open"])': {
          border: '1px solid #00000026',
          boxShadow: '0px 4px 8px 0px #0000000D',
        },

        '&:hover': {
          border: '1px solid #00000026',
          boxShadow: '0px 4px 8px 0px #0000000D',
          '& .sparrow-attachments-thumbnail-actions': {
            opacity: 1,
          },
          '& .default-text': {
            opacity: 0,
          },
          '& .hover-text': {
            opacity: 1,
          },
        },
      }}
    >
      <Flex
        shrink={0}
        css={{
          height: '$10',
          width: '$10',
          borderRadius: '$lg',
        }}
      >
        {getFileIcon(attachment)}
      </Flex>
      <Flex grow={1} shrink={1} flexDirection="column" css={{ minWidth: '0' }}>
        <Tooltip
          className="dm-sans"
          content={isOverflow ? attachment.name : null}
          css={{ wordBreak: 'break-all' }}
        >
          <Text
            ref={fileNameRef}
            as="h4"
            weight="bold"
            truncate
            css={{
              color: '$neutral900',
              whiteSpace: 'nowrap',
            }}
          >
            {attachment.name}
          </Text>
        </Tooltip>
        <Text
          as="h5"
          size="xs"
          css={{ color: '$neutral700', position: 'relative' }}
        >
          <Box as="span" className="default-text">
            {attachment.name?.split('.')?.pop().toUpperCase()} .{' '}
            {attachment?.properties?.size &&
              formatBytes(attachment.properties.size)}
          </Box>
          <Box as="span" className="hover-text">
            {I18n.t('attachments.clickToView')}{' '}
            {attachment.name?.split('.')?.pop().toUpperCase()}
          </Box>
        </Text>
      </Flex>
      <Flex alignItems="center">
        <Tooltip sideOffset={2} content={I18n.t('attachments.downloadFile')}>
          <IconButton
            className="sparrow-attachments-thumbnail-actions"
            alignItems="center"
            variant="ghost"
            color="default"
            icon={<DownloadIcon strokeWidth={2} size={20} />}
            css={{
              flexShrink: 0,
              transition: 'opacity 0.3s ease',
              opacity: '0',
              width: '$6',
            }}
            onClick={() => {
              if (handleDownload) {
                handleDownload(attachment);
              } else {
                downloadSrcAsFile(attachment.name, attachment.url);
              }
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default File;
