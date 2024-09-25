import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  Flex,
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Button,
  CircleLoader,
  Tooltip,
  Text,
  Input,
} from '@sparrowengg/twigs-react';
import Header from './components/Header';
import { PauseIcon, PlayIcon } from './Icons';

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(timeInSeconds % 60)
    .toString()
    .padStart(2, '0');

  if (seconds === 'NaN') return '00:00';

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};

const Video = ({ data = {}, open = false, onClose = () => {} }) => {
  const videoRef = React.useRef(null);
  const [controls, setControls] = React.useState({
    playing: true,
    played: 0,
    loop: false,
    volume: null,
    muted: false,
    playbackRate: 1.0,
    height: 'auto',
    width: '100%',
    style: { zIndex: 2 },
    loaded: 0,
    duration: 0,
    seeking: false,
  });

  const handleProgress = (state) => {
    if (!controls.seeking) {
      console.log(state.played);

      setControls((prev) => ({ ...prev, played: state.played }));
      if (state.played === 1) {
        setControls((prev) => ({ ...prev, playing: false }));
      }
    }
  };

  const handlePlayPause = () => {
    setControls((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const handleSeekMouseDown = (e) => {
    setControls((prev) => ({ ...prev, seeking: true }));
  };

  const handleSeekChange = (e) => {
    setControls((prev) => ({ ...prev, played: parseFloat(e.target.value) }));
  };

  const handleSeekMouseUp = (e) => {
    setControls((prev) => ({ ...prev, seeking: false }));
    videoRef.current?.seekTo(parseFloat(e.target.value));
  };

  React.useEffect(() => {
    const video = document.getElementById('video-player-src');
    const canvas = document.getElementById('video-player-canvas');

    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    function getCurrentImage() {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    setInterval(getCurrentImage, 100);
  });

  return (
    <Dialog open={open}>
      <DialogContent
        onEscapeKeyDown={onClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
        css={{
          backgroundColor: '$black900',
          padding: 0,
          width: '100%',
          height: '100%',
          borderRadius: '$2xl',
          overflow: 'hidden',
        }}
      >
        <Flex
          css={{
            position: 'relative',
            height: '100%',
          }}
        >
          <Header {...{ currentData: data, onClose }} />
          <Flex
            alignItems="center"
            css={{
              width: '100%',
              height: '100%',
            }}
          >
            <ReactPlayer
              ref={videoRef}
              url={data?.src}
              config={{
                file: {
                  attributes: {
                    className: 'video',
                    id: 'video-player-src',
                  },
                },
              }}
              onProgress={handleProgress}
              {...controls}
            />
            <Box
              as="canvas"
              aria-hidden="true"
              id="video-player-canvas"
              css={{
                borderRadius: '10px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(100px)',
                background: '$black900',
                opacity: 0.7,
              }}
            />
          </Flex>
          <Flex
            id="video-player-controls"
            alignItems="center"
            gap="$4"
            css={{
              position: 'absolute',
              zIndex: 3,
              bottom: 0,
              left: 0,
              width: '100%',
              height: '$20',
              padding: '$12 $20 $12 $10',
              background:
                'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
            }}
          >
            <IconButton
              size="lg"
              variant="ghost"
              icon={controls.playing ? <PauseIcon /> : <PlayIcon />}
              onClick={handlePlayPause}
              css={{
                flexShrink: 0,
              }}
            />
            <Box
              as="input"
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={controls?.played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              css={{
                '-webkit-appearance': 'none',
                background: 'transparent',
                width: '100%',
                cursor: 'pointer',
                '&::-webkit-slider-runnable-track': {
                  height: '6px',
                  borderRadius: '30px',
                  background: '$white500',
                },
                '&::-moz-range-track': {
                  height: '6px',
                  borderRadius: '30px',
                  background: '$white500',
                },

                '&::-webkit-slider-thumb': {
                  '-webkit-appearance': 'none',
                  appearance: 'none',
                  height: '6px',
                  width: '6px',
                  borderRadius: '30px',
                  background: '$white800',
                },

                '&::-moz-range-thumb': {
                  border: 'none',
                  borderRadius: 0,
                  height: '6px',
                  width: '6px',
                  borderRadius: '30px',
                  background: '$white800',
                },
              }}
            />
            <Flex shrink={0} css={{ paddingLeft: '$2' }}>
              <Text as="h4" weight="bold" css={{ color: '$white900' }}>
                {formatTime(videoRef.current?.getCurrentTime())}&nbsp;
              </Text>
              <Text as="h4" weight="medium" css={{ color: '$white800' }}>
                / {formatTime(videoRef.current?.getDuration())}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default Video;
