import { Box, keyframes } from '@sparrowengg/twigs-react';

const Skeleton = ({
  width,
  height,
  boxBackground = 'rgba(100, 116, 139, 0.08)',
  background = 'rgba(100, 116, 139, 0.08)',
  radius = '3px',
  css,
}) => {
  return (
    <Box
      css={{
        overflow: 'hidden',
        position: 'relative',
        height,
        background,
        width,
        borderRadius: radius,
        ...css,
        '&::after': {
          position: 'absolute',
          content: '""',
          width: '$25',
          // height,
          height: '360px',
          background: `linear-gradient(to right, transparent 0%, ${boxBackground} 48%, transparent 100%)`,
          left: 0,
          // top: 0,
          top: '-$45',
          animation: `${execSkeletonLoader} 1s linear infinite`,
          transform: 'rotate(45deg)',
        },
      }}
    />
  );
};

const execSkeletonLoader = keyframes({
  '0%': {
    left: ' -150px',
  },
  '100%': {
    left: '120%',
  },
});

export default Skeleton;
