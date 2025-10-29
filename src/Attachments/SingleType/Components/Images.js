import { Box, Flex, Text } from '@sparrowengg/twigs-react';
import ImageLoader from '../../Common/ImageLoader';

const Images = ({ data = [], setOpen }) => {
  return (
    <Flex className="sparrow-attachments-images" gap="$4" wrap="wrap">
      {data?.slice(0, 4).map((attachment, index) => {
        const isLastImage = index === 3 && data.length > 4;
        return (
          <Box css={{ position: 'relative', height: '$20', width: '$25' }}>
            <ImageLoader
              height="$20"
              width="$25"
              src={attachment?.url}
              onClick={() => {
                setOpen(attachment?.id);
              }}
            />
            {isLastImage && (
              <Flex
                alignItems="center"
                justifyContent="center"
                css={{
                  pointerEvents: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: '#00000080',
                  color: '$white900',
                  height: '$20',
                  width: '$25',
                  borderRadius: '$lg',
                  userSelect: 'none',
                }}
              >
                <Text as="h4" size="lg" weight="bold">
                  +{data.length - 3}
                </Text>
              </Flex>
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default Images;
