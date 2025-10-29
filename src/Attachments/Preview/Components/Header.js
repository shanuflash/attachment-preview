import React from 'react';
import {
  Flex, IconButton, Tooltip, Text 
} from '@sparrowengg/twigs-react';
import { CloseIcon, DownloadIcon } from '@sparrowengg/twigs-react-icons';
import Avatar from '../../Common/Avatar';
import ReactTimeAgo from 'react-time-ago';
import FileTooltip from './FileTooltip';
import { downloadSrcAsFile } from '../../Common/helpers';
import { I18n } from 'react-redux-i18n';

const Header = ({
  currentData = {},
  onClose = () => {},
  showDownload = true,
  handleDownload,
  css,
}) => {
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
        ...css,
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
            {currentData?.created_at && (
              <>
                <Text
                  size="xs"
                  as="h4"
                  css={{
                    flexShrink: 0,
                  }}
                >
                  <ReactTimeAgo date={currentData.created_at} locale="en-US" />
                </Text>
                <Text size="xs" as="h4" css={{ color: '$white600' }}>
                  .
                </Text>
              </>
            )}
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
        {showDownload && (
          <Tooltip
            className="dm-sans"
            content={I18n.t('attachments.download')}
            side="bottom"
            sideOffset={8}
          >
            <IconButton
              color="light"
              size="lg"
              icon={<DownloadIcon size={24} />}
              css={{ borderRadius: '8px' }}
              onClick={() => {
                if (handleDownload) {
                  handleDownload(currentData);
                } else {
                  downloadSrcAsFile(currentData?.name, currentData?.url);
                }
              }}
            />
          </Tooltip>
        )}
        <Tooltip
          className="dm-sans"
          content={I18n.t('attachments.close')}
          side="bottom"
          sideOffset={8}
        >
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
