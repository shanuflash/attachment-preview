import { Box, keyframes } from '@sparrowengg/twigs-react';
import { useEffect, useState } from 'react';

const unblur = keyframes({
  from: { filter: 'blur(10px)' },
  to: { filter: 'blur(0px)' },
});

const ImageLoader = ({
  src, width, height, ...rest 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [src]);

  return (
    <Box
      css={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#e5e7eb',
        borderRadius: '$lg',
        cursor: 'pointer',
      }}
      {...rest}
    >
      <Box
        css={{
          animation: isLoading ? 'none' : `${unblur} 0.2s ease forwards`,
          filter: isLoading ? 'blur(10px)' : 'blur(0px)',
        }}
      >
        <Box
          as="img"
          src={src}
          css={{
            width,
            height,
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
};
export default ImageLoader;
