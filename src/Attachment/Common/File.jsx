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
  EllipsisVerticalIcon,
  PlayFillIcon,
} from '@sparrowengg/twigs-react-icons';
import React, { useState, useEffect } from 'react';
import { AttachmentIcons } from './Icons';

const getFileIcon = (attachment) => {
  switch (attachment?.type) {
    case 'text/csv':
      return <AttachmentIcons.CSV />;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.ms-excel':
      return <AttachmentIcons.XLS />;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/msword':
      return <AttachmentIcons.DOC />;
    case 'text/html':
      return <AttachmentIcons.HTML />;
    case 'application/pdf':
      return <AttachmentIcons.PDF />;
    default:
      if (attachment?.type?.includes('image')) {
        return (
          <Box
            as="img"
            src={attachment?.url}
            alt="attachment"
            css={{
              height: '$10',
              width: '$10',
              borderRadius: '$lg',
              objectFit: 'cover',
            }}
          />
        );
      } else if (attachment?.type?.includes('audio')) {
        return <PlayFillIcon color="#64748B" size={40} />;
      } else {
        return <AttachmentIcons.FILE />;
      }
  }
};

const File = ({ attachment, setCurrentData, setOpen }) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const text = document.getElementById(`tm_attachment_${attachment.id}_name`);

    if (text) {
      setIsOverflow(text.scrollWidth > text.clientWidth);
    }
  }, [attachment.id]);

  return (
    <Flex
      gap="$4"
      onClick={() => {
        setCurrentData(attachment);
        let key = 'unsupported';
        if (attachment.type.includes('image')) {
          key = 'image';
        } else if (attachment.type.includes('video')) {
          key = 'video';
        } else if (attachment.type.includes('audio')) {
          key = 'audio';
        } else if (attachment.type === 'application/pdf') {
          key = 'pdf';
        }
        setOpen((prev) => ({ ...prev, [key]: true }));
      }}
      css={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: '$14',
        width: '320px',
        border: '1px solid #0000001A',
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
        <Tooltip content={isOverflow ? attachment.name : null}>
          <Text
            weight="bold"
            truncate
            css={{
              color: '$neutral900',
              whiteSpace: 'nowrap',
            }}
            id={`tm_attachment_${attachment.id}_name`}
          >
            {attachment.name}
          </Text>
        </Tooltip>
        <Text size="xs" css={{ color: '$neutral700', position: 'relative' }}>
          <Box as="span" className="default-text" css={{}}>
            {attachment.name?.split('.')?.pop().toUpperCase()} . 10 Kb
            {/* fix size */}
          </Box>
          <Box as="span" className="hover-text" css={{}}>
            Click to view {attachment.name?.split('.')?.pop().toUpperCase()}
          </Box>
        </Text>
      </Flex>
      <Flex alignItems="center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton
              className="sparrow-attachments-thumbnail-actions"
              alignItems="center"
              variant="ghost"
              color="default"
              icon={<EllipsisVerticalIcon strokeWidth={2} size={20} />}
              css={{
                flexShrink: 0,
                transition: 'opacity 0.3s ease',
                opacity: '0',
                width: '$6',
                '&[data-state="open"]': {
                  opacity: '1 !important',
                  background: '#00000014 !important',
                },
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            size="sm"
            onCloseAutoFocus={(e) => e.preventDefault()}
            align="end"
            sideOffset={4}
            alignOffset={-4}
            css={{
              minWidth: '200px',
              maxWidth: '200px',
              padding: '$4 0',
            }}
          >
            <DropdownMenuItem
              css={{
                padding: '$2 $6 !important',
              }}
            >
              <Text as="h4">Download File</Text>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Open in Browser</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>
    </Flex>
  );
};

export default File;
