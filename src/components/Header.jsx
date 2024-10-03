import React from 'react';
import { Flex, Box, IconButton, Tooltip, Text } from '@sparrowengg/twigs-react';
import { CloseIcon, DownloadIcon } from '@sparrowengg/twigs-react-icons';
import Avatar from './Avatar';
import ReactTimeAgo from 'react-time-ago';
import moment from 'moment-timezone';

const Header = ({ currentData = {}, onClose = () => {} }) => {
  const getFormattedDate = (date, format) => {
    return moment(date).tz(moment.tz.guess()).format(format);
  };

  const formatBytes = React.useCallback(
    (bytes, decimals = 2) => {
      if (!+bytes) return '0 Bytes';

      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },
    [currentData]
  );
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
              <ReactTimeAgo date={currentData?.uploadedAt} locale="en-US" />
            </Text>
            <Text size="xs" as="h4" css={{ color: '$white600' }}>
              .
            </Text>
            <Tooltip
              css={{
                background: 'white',
                boxShadow: '0px 4px 25px 0px #00000026',
                borderRadius: '$xl',
                border: '1px solid $neutral100',
                padding: '$6 $8',
                color: '$neutral900',
                minWidth: '264px',
                maxWidth: '264px',
                '& > span:not([role="tooltip"]) > svg': {
                  fill: '$white900',
                },
              }}
              side="bottom"
              align="start"
              sideOffset={4}
              content={
                <Flex gap="$2" flexDirection="column">
                  <Text
                    as="h4"
                    weight="medium"
                    css={{ color: '$black900' }}
                    truncate
                  >
                    {currentData?.name}
                  </Text>
                  <Flex gap="$2">
                    <Text
                      as="h4"
                      size="xs"
                      weight="medium"
                      css={{ color: '$neutral700' }}
                      truncate
                    >
                      {formatBytes(currentData?.size)} •
                    </Text>
                    <Text
                      as="h4"
                      size="xs"
                      css={{ color: '$neutral700' }}
                      truncate
                    >
                      {getFormattedDate(
                        currentData?.uploadedAt,
                        'MMMM D, YYYY [at] h:mm A'
                      )}
                    </Text>
                  </Flex>
                </Flex>
              }
            >
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
            </Tooltip>
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
