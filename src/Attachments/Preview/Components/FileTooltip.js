import { Flex, Text, Tooltip } from '@sparrowengg/twigs-react';
import moment from 'moment';
import { useCallback } from 'react';

const FileTooltip = ({ children, currentData }) => {
  const formatBytes = useCallback(
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
  const getFormattedDate = (date, format) => {
    return moment(date).local().format(format);
  };

  return (
    <Tooltip
      className="dm-sans"
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
          <Text as="h4" weight="medium" css={{ color: '$black900' }} truncate>
            {currentData?.name}
          </Text>
          <Flex gap="$2">
            {currentData?.properties?.size && <Text
              as="h4"
              size="xs"
              weight="medium"
              css={{ color: '$neutral700' }}
              truncate
            >
              {formatBytes(currentData.properties.size)} •
            </Text>
            }
            {currentData?.created_at && <Text as="h4" size="xs" css={{ color: '$neutral700' }} truncate>
              {getFormattedDate(
                currentData.created_at,
                'MMMM D, YYYY [at] h:mm A'
              )}
            </Text>
            }
          </Flex>
        </Flex>
      }
    >
      {children}
    </Tooltip>
  );
};

export default FileTooltip;
