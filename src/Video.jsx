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
import { PauseIcon, PlayIcon } from './components/Icons';
import ProgressBar from './components/ProgressBar';

const formatTime = (timeInSeconds) => {
  const hours = Math.round(timeInSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.round((timeInSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.round(timeInSeconds % 60)
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
    style: {
      zIndex: 2,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaded: 0,
    duration: 0,
    seeking: false,
  });

  const handlePlayPause = () => {
    setControls((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const handleSkip = (side = 'forward') => {
    const newTime = Math.min(
      valueRef.current.duration,
      valueRef.current.playedSeconds + (side === 'forward' ? 5 : -5)
    );
    const newPlayed = (newTime / valueRef.current.duration) * 100;
    videoRef.current.seekTo(newPlayed / 100, 'fraction');
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

  const valueRef = React.useRef({
    duration: 0,
    playedSeconds: 0,
  });
  const seekRef = React.useRef(null);

  const handleSeek = (e) => {
    setControls((prev) => ({ ...prev, seeking: true }));

    const progressBar = document.getElementById('video-player-progress');
    progressBar.value = e.target.value;
    progressBar.style.setProperty('--value', e.target.value);

    videoRef.current.seekTo(e.target.value / 100, 'fraction');
    setControls((prev) => ({
      ...prev,
      played: e.target.value / 100,
      seeking: false,
    }));
  };

  const handleProgress = (value) => {
    const fixedValue = (value.played * 100).toFixed(1);
    valueRef.current.playedSeconds = value.playedSeconds;

    const progressBar = document.getElementById('video-player-progress');
    progressBar.value = fixedValue;
    progressBar.style.setProperty('--value', fixedValue);

    document.getElementById('video-player-elapsed-time').innerHTML =
      `${formatTime(value.playedSeconds)} &nbsp;`;

    if (value.played === 1) {
      setControls((prev) => ({ ...prev, playing: false }));
    }
  };

  useEffect(() => {
    if (!open) return;

    setControls((prev) => ({ ...prev, playing: true }));
    const handleKeyDown = (event) => {
      switch (event.code) {
        // toggle play/pause
        case 'Space':
        case 'KeyK': {
          handlePlayPause();
          break;
        }

        // Seek
        case 'ArrowRight': {
          handleSkip('forward');
          break;
        }
        case 'ArrowLeft': {
          handleSkip('backward');
          break;
        }

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

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
            css={{
              width: '100%',
              video: {
                maxHeight: '100%',
              },
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
              onDuration={(duration) => {
                setControls((prev) => ({ ...prev, duration }));
                valueRef.current.duration = duration;
              }}
              progressInterval={10}
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
            <Tooltip
              delayDuration={3000}
              content={controls.playing ? 'Pause' : 'Play'}
              side="top"
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
            </Tooltip>

            <ProgressBar value={controls.played * 100} onChange={handleSeek} />
            <Flex shrink={0} css={{ paddingLeft: '$2' }}>
              <Text
                id="video-player-elapsed-time"
                as="h4"
                weight="bold"
                css={{ color: '$white900' }}
              />
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
