import { Box } from '@sparrowengg/twigs-react';
import { motion } from 'framer-motion/dist/framer-motion';
import { useEffect, useState } from 'react';

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
      }}
      {...rest}
    >
      <motion.div
        initial={{ filter: 'blur(10px)' }}
        animate={{ filter: isLoading ? 'blur(10px)' : 'blur(0px)' }}
        transition={{
          duration: 0.2,
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
      </motion.div>
    </Box>
  );
};
export default ImageLoader;
