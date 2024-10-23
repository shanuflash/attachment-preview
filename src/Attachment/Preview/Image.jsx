import React from 'react';
import {
  Flex,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  CircleLoader,
  Tooltip,
  Text,
} from '@sparrowengg/twigs-react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DownloadIcon,
} from '@sparrowengg/twigs-react-icons';
import Avatar from '../../components/Avatar';
// import ReactTimeAgo from 'react-time-ago';
import moment from 'moment-timezone';
import Header from '../../components/Header';

const Image = ({ data = [], active = 0, open = false, onClose = () => {} }) => {
  const containerRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const [currentData, setCurrentData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // React.useEffect(() => {
  //   if (!open) return;
  //   setCurrentData(data[0]);
  // }, [data, open]);

  React.useEffect(() => {
    if (!open) return;
    setCurrentData(data.find((data) => data.id === active.id));
  }, [active, open]);

  const setImageScale = () => {
    if (!containerRef.current || !imageRef.current) return;
    setLoading(false);
    const containerHeight = containerRef.current?.clientHeight;
    const imageHeight = imageRef.current?.clientHeight;
    const scale = Math.min(containerHeight / imageHeight, 1);
    imageRef.current.style.transform = `translate3d(0px, 0px, 0px) rotate(0deg) scale(${scale}, ${scale})`;
  };

  const { prevImageExists, nextImageExists, prevImageIndex, nextImageIndex } =
    React.useMemo(() => {
      const currentIndex = data.findIndex(
        (data) => data?.id === currentData?.id
      );
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;
      return {
        prevImageExists: prevIndex >= 0,
        nextImageExists: nextIndex < data.length,
        prevImageIndex: prevIndex,
        nextImageIndex: nextIndex,
      };
    }, [currentData?.id, data]);

  console.log(
    ' prevImageExists, nextImageExists, prevImageIndex, nextImageIndex ',
    prevImageExists,
    nextImageExists,
    prevImageIndex,
    nextImageIndex
  );

  return (
    <Dialog open={open}>
      <DialogContent
        onEscapeKeyDown={onClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
        css={{
          backgroundColor: '$white900',
          padding: 0,
          width: '100%',
          height: '100%',
          borderRadius: '$2xl',
          overflow: 'hidden',
        }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          css={{
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
          ref={containerRef}
        >
          <Header {...{ currentData, onClose }} />

          {loading && (
            <Flex
              id="image-viewer-loader"
              alignItems="center"
              justifyContent="center"
              css={{
                position: 'absolute',
                zIndex: 3,
                height: '100%',
                width: '100%',
                backgroundColorOpacity: ['$black900', 0.4],
              }}
            >
              <CircleLoader color="bright" size="3xl" />
            </Flex>
          )}

          <Box
            id="image-viewer-src"
            as="img"
            onLoad={setImageScale}
            onError={() => {}}
            ref={imageRef}
            src={currentData?.url}
            css={{ zIndex: 2, userSelect: 'none' }}
          />

          <Box
            id="image-viewer-background"
            css={{
              zIndex: 1,
              position: 'absolute',
              background: `url(${currentData?.url})`,
              pointerEvents: 'none',
              filter: 'blur(40px) brightness(.4)',
              backgroundColor: '#000',
              backgroundPosition: '50%',
              backgroundSize: 'cover',
              inset: '-100px',
            }}
          />

          {prevImageExists && (
            <Box
              css={{
                zIndex: 3,
                position: 'absolute',
                left: '$12',
              }}
            >
              <Tooltip content="Previous" sideOffset={8}>
                <IconButton
                  id="image-viewer-prev-image"
                  size="xl"
                  css={{
                    borderRadius: '$round',
                  }}
                  color="bright"
                  icon={<ChevronLeftIcon strokeWidth={1.8} size={32} />}
                  onClick={() => {
                    setLoading(true);
                    setCurrentData(data[prevImageIndex]);
                  }}
                />
              </Tooltip>
            </Box>
          )}

          {nextImageExists && (
            <Box
              css={{
                zIndex: 3,
                position: 'absolute',
                right: '$12',
              }}
            >
              <Tooltip content="Next" sideOffset={8}>
                <IconButton
                  id="image-viewer-next-image"
                  size="xl"
                  css={{
                    borderRadius: '$round',
                  }}
                  color="bright"
                  icon={<ChevronRightIcon strokeWidth={1.8} size={32} />}
                  onClick={() => {
                    setLoading(true);
                    setCurrentData(data[nextImageIndex]);
                  }}
                />
              </Tooltip>
            </Box>
          )}
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default Image;
