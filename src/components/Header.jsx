import React from 'react';
import { Flex, Box, IconButton, Tooltip, Text } from '@sparrowengg/twigs-react';
import { CloseIcon, DownloadIcon } from '@sparrowengg/twigs-react-icons';
import Avatar from './Avatar';
import ReactTimeAgo from 'react-time-ago';
import moment from 'moment-timezone';
import FileTooltip from './FileTooltip';

const Header = ({ currentData = {}, onClose = () => {} }) => {
  const downloadSrcAsFile = (name, url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Flex
      id="image-viewer-header"
      justifyContent="space-between"
      css={{
        zIndex: 6,
        height: '$18',
        padding: '$8',
        width: '100%',
        position: 'absolute',
        top: 0,
        background:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)',
      }}
    >
      <Flex id="image-viewer-meta" gap="$4">
        <Avatar
          name={currentData?.uploadedBy?.name}
          src={currentData?.uploadedBy?.image}
          size="lg"
          rounded="lg"
        />
        <Flex flexDirection="column" css={{ h4: { color: '$white900' } }}>
          <Text as="h4" weight="bold">
            {currentData?.uploadedBy?.name}
          </Text>
          <Flex css={{ height: '$4' }} gap="$2">
            <Text
              size="xs"
              as="h4"
              css={{
                flexShrink: 0,
              }}
            >
              <ReactTimeAgo date={currentData?.created_at} locale="en-US" />
            </Text>
            <Text size="xs" as="h4" css={{ color: '$white600' }}>
              .
            </Text>
            <FileTooltip currentData={currentData}>
              <Text
                size="xs"
                as="h4"
                weight="medium"
                css={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  textDecorationStyle: 'dashed',
                  textDecorationColor: '$white600',
                }}
              >
                {currentData?.name}
              </Text>
            </FileTooltip>
          </Flex>
        </Flex>
      </Flex>
      <Flex id="image-viewer-options" gap="$4">
        <Tooltip content="Download" side="bottom" sideOffset={8}>
          <IconButton
            color="light"
            size="lg"
            icon={<DownloadIcon size={24} />}
            css={{ borderRadius: '8px' }}
            onClick={() =>
              downloadSrcAsFile(currentData?.name, currentData?.src)
            }
          />
        </Tooltip>
        <Tooltip content="Close" side="bottom" sideOffset={8}>
          <IconButton
            color="light"
            size="lg"
            icon={<CloseIcon size={24} />}
            css={{ borderRadius: '8px' }}
            onClick={onClose}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Header;
