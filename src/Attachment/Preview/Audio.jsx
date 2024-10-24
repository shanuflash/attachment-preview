import React, { useEffect, useRef, useState } from 'react';
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
  LineLoader,
  Separator,
} from '@sparrowengg/twigs-react';
import Header from './Components/Header';
import { InfoIcon, PauseIcon, PlayIcon } from '../Common/Icons';
import { AudioVisualizer } from 'react-audio-visualize';
import TrackBar from './Components/TrackBar';
import { formatTime } from './Video';
import DownloadDropdown from './Components/DownloadDropdown';
import { CloseIcon } from '@sparrowengg/twigs-react-icons';
import FileTooltip from './Components/FileTooltip';

const defaultControls = {
  playing: true,
  played: 0,
  loop: false,
  volume: null,
  muted: false,
  playbackRate: 1.0,
  height: 'auto',
  width: '100%',
  loaded: 0,
  duration: 0,
  seeking: false,
};

const AudioPlayer = ({
  data = {},
  open = false,
  onClose = () => {},
  autoPlay = true,
}) => {
  const interval = useRef(null);

  const [blob, setBlob] = useState();
  const [audio] = useState(() => new Audio());
  const [controls, setControls] = useState({
    ...defaultControls,
    autoPlay: autoPlay,
  });

  const [loading, setLoading] = useState(false); // true
  const [blobLoading, setBlobLoading] = useState(true);
  const [error, setError] = useState(false);
  const [buffering, setBuffering] = useState(false);

  const onAudioEnded = () => {
    setControls({ ...controls, playing: false });
  };

  const handlePlayPause = () => {
    if (!controls.playing) {
      if (!audio.src) return;
      if (audio.duration !== Infinity) {
        setControls({ ...controls, duration: audio.duration });
      }

      audio.play();
    } else {
      audio.pause();
    }

    setControls((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const handleSeek = (time) => {
    audio.currentTime = time;
    setControls((prev) => ({ ...prev, played: time }));
  };

  const handleClose = () => {
    setControls(defaultControls);
    setBlob(null);
    onClose();
    setBlobLoading(true);
  };

  const handleTimeUpdates = () => {
    if (audio.currentTime >= controls.duration) {
      pauseAudio();
      return;
    }
    setControls((prev) => ({ ...prev, played: audio.currentTime }));
  };

  useEffect(() => {
    if (controls.playing) {
      interval.current = setInterval(() => {
        requestAnimationFrame(handleTimeUpdates);
      }, 100);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    }
  }, [controls.playing]);

  useEffect(() => {
    if (!open) return;

    fetch(data.url)
      .then(async (response) => {
        const blob = await response.blob();
        audio.src = URL.createObjectURL(blob);
        audio.volume = 0.5;
        audio.loop = false;
        audio.muted = false;
        audio.autoplay = true;
        audio.preload = 'metadata';
        audio.playbackRate = 1.0;

        audio.addEventListener('ended', onAudioEnded);
        setBlob(blob);
        setBlobLoading(false);
        return blob;
      })
      .catch((error) => {
        console.log('Error loading audio', error);
        setError(true);
        setBlobLoading(false);
      })
      .then(async (blob) => {
        const audioBuffer = await blob.arrayBuffer();
        const audioContext = new AudioContext();
        await audioContext.decodeAudioData(audioBuffer, (buffer) => {
          setControls({ ...controls, duration: buffer.duration });
        });
      });

    autoPlay && handlePlayPause();
    return () => {
      audio.removeEventListener('ended', onAudioEnded);
    };
  }, [open, autoPlay]);

  return (
    <Dialog open={open}>
      <DialogContent
        onEscapeKeyDown={handleClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={handleClose}
        css={{
          width: '600px',
          height: '520px',
          backgroundColor: '$white900',
          padding: 0,
          borderRadius: '$2xl',
          overflow: 'hidden',
        }}
      >
        <Flex
          flexDirection="column"
          css={{
            width: '100%',
            height: '100%',
          }}
        >
          <Flex
            id="audio-player-header"
            alignItems="center"
            justifyContent="space-between"
            css={{
              height: '$18',
              padding: '$8 $12',
              borderBottom: '1px solid $neutral200',
            }}
          >
            <Flex alignItems="center" gap="$2">
              <Text
                as="h3"
                size="lg"
                weight="bold"
                css={{
                  color: '$neutral900',
                }}
              >
                Audio
              </Text>
              <FileTooltip currentData={data}>
                <Flex css={{ cursor: 'pointer' }}>
                  <InfoIcon id="audio-player-info" size={24} />
                </Flex>
              </FileTooltip>
            </Flex>
            <Flex gap="$4" alignItems="center">
              <DownloadDropdown
                options={[
                  {
                    label: 'Download Audio',
                    value: 'audio',
                  },
                  {
                    label: 'Download Transcript',
                    value: 'transcript',
                  },
                ]}
              />
              <Box
                css={{
                  height: '$6',
                  width: '1px',
                  background: '$neutral200',
                }}
              />
              <IconButton
                color="secondary"
                icon={<CloseIcon />}
                size="lg"
                variant="ghost"
                onClick={handleClose}
              />
            </Flex>
          </Flex>
          <Flex
            id="audio-player"
            alignItems="center"
            justifyContent="space-between"
            gap="$6"
            css={{
              padding: '$16 $12',
            }}
          >
            <Tooltip
              delayDuration={3000}
              content={controls.playing ? 'Pause' : 'Play'}
              side="top"
            >
              <IconButton
                id="audio-player-play-button"
                size="lg"
                color="default"
                icon={
                  controls?.playing ? (
                    <PauseIcon color="#64748B" />
                  ) : (
                    <PlayIcon color="#64748B" />
                  )
                }
                onClick={handlePlayPause}
                css={{
                  flexShrink: 0,
                }}
              />
            </Tooltip>
            <Flex justifyContent="center" grow={1}>
              {blobLoading ? (
                <LineLoader
                  color="secondary"
                  size="xl"
                  css={{
                    width: '100%',
                    background: '$neutral100',
                  }}
                />
              ) : error ? (
                <Text
                  css={{
                    color: '$neutral800',
                  }}
                >
                  Error while loading audio file...
                </Text>
              ) : (
                <Flex css={{ position: 'relative' }}>
                  <AudioVisualizer
                    blob={blob}
                    width={450}
                    height={40}
                    barWidth={3}
                    gap={4}
                    barColor="#E2E6EB"
                    barPlayedColor="#64748B"
                    currentTime={controls.played}
                  />
                  <TrackBar
                    total={controls.duration}
                    current={controls.played}
                    setCurrent={handleSeek}
                  />
                </Flex>
              )}
            </Flex>
            <Flex alignItems="center" shrink={0} css={{ width: '$10' }}>
              <Text
                as="h4"
                weight="bold"
                css={{
                  color: '$neutral800',
                }}
              >
                {formatTime(controls.played) ||
                  formatTime(controls.duration) ||
                  '00:00'}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

export default AudioPlayer;
