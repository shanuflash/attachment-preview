import { Box, Flex } from '@sparrowengg/twigs-react';
import { PlayFillIcon } from '@sparrowengg/twigs-react-icons';
import Skeleton from '../../Common/Skeleton';

const Videos = ({ data = [], setOpen }) => {
  return (
    <Flex
      className="sparrow-attachments-videos"
      gap="$4"
      wrap="wrap"
      css={{ overflowX: 'auto' }}
    >
      {data?.map((item, index) => {
        return (
          <Box
            key={index}
            css={{
              border: '1px solid $black200',
              borderRadius: '$xl',
              overflow: 'hidden',
              position: 'relative',
              height: '180px',
              width: '320px',
              flexShrink: 0,
              '& .play-icon': {
                backdropFilter: 'blur(0.5px) brightness(0.90)',
              },
              '&:hover': {
                border: '1px solid $black300',
                '& .play-icon': {
                  backdropFilter: 'blur(0.5px) brightness(0.85)',
                },
              },
            }}
          >
            {!!item?.thumbnail ? (
              <Box
                as="img"
                src={item?.thumbnail}
                css={{
                  objectFit: 'cover',
                  height: '100%',
                  width: '100%',
                  userSelect: 'none',
                }}
              />
            ) : (
              <Skeleton height="180px" width="320px" />
            )}
            <Flex
              className="play-icon"
              alignItems="center"
              justifyContent="center"
              css={{
                transition: 'backdrop-filter 0.2s',
                backdropFilter: 'blur(0.5px)',
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                cursor: 'pointer',
              }}
              onClick={() => {
                setOpen(item?.id);
              }}
            >
              <PlayFillIcon color="#64748B" size={50} />
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Videos;
