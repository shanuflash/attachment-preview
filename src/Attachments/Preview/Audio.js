import {
  Flex,
  Text,
  Tooltip,
  IconButton,
  LineLoader,
} from '@sparrowengg/twigs-react';
import React, {
  useCallback, useEffect, useRef, useState 
} from 'react';
import { I18n } from 'react-redux-i18n';
import { AudioVisualizer } from 'react-audio-visualize';
import { downloadSrcAsFile, formatTime } from '../Common/helpers';
import PauseIcon from '../Common/Icons/PauseIcon';
import PlayIcon from '../Common/Icons/PlayIcon';
import TrackBar from '../Preview/Components/TrackBar';
import { DownloadIcon } from '@sparrowengg/twigs-react-icons';

const defaultControls = {
  playing: false,
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

const Audio = ({ data = {}, handleDownload, small = false }) => {
  const interval = useRef(null);
  const fileNameRef = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  const [blob, setBlob] = useState();
  const [audioElement] = useState(() => new window.Audio());
  const [controls, setControls] = useState({
    ...defaultControls,
  });

  const [blobLoading, setBlobLoading] = useState(true);
  const [error, setError] = useState(false);

  const onAudioEnded = () => {
    setControls((prev) => ({ ...prev, playing: false }));
  };

  const handlePlayPause = () => {
    if (!controls.playing) {
      if (!audioElement.src) return;
      if (audioElement.duration !== Infinity) {
        setControls({ ...controls, duration: audioElement.duration });
      }

      audioElement.play();
    } else {
      audioElement.pause();
    }

    setControls((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const handleSeek = (time) => {
    audioElement.currentTime = time;
    setControls((prev) => ({ ...prev, played: time }));
  };

  const handleTimeUpdates = () => {
    if (audioElement.currentTime >= controls.duration) {
      setControls((prev) => ({ ...prev, played: 0, playing: false }));
      return;
    }
    setControls((prev) => ({ ...prev, played: audioElement.currentTime }));
  };

  const formatBytes = useCallback(
    (bytes, decimals = 2) => {
      if (!+bytes) return '0 Bytes';

      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    },
    [data.id]
  );

  const loadAudio = async () => {
    try {
      const response = await fetch(data.url);
      const blob = await response.blob();
      audioElement.src = URL.createObjectURL(blob);
      audioElement.volume = 0.5;
      audioElement.loop = false;
      audioElement.muted = false;
      audioElement.autoplay = false;
      audioElement.preload = 'metadata';
      audioElement.playbackRate = 1.0;
      audioElement.addEventListener('ended', onAudioEnded);
      setBlob(blob);
      setBlobLoading(false);
      const audioBuffer = await blob.arrayBuffer();
      const audioContext = new AudioContext();
      await audioContext.decodeAudioData(audioBuffer, (buffer) => {
        setControls({ ...controls, duration: buffer.duration });
      });
    } catch (error) {
      console.log('Error loading audio', error);
      setError(true);
      setBlobLoading(false);
    }
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
    const text = fileNameRef.current;

    if (text) {
      setIsOverflow(text.scrollWidth > text.clientWidth);
    }
  }, [data.id]);

  useEffect(() => {
    loadAudio();

    return () => {
      audioElement.removeEventListener('ended', onAudioEnded);
    };
  }, []);

  return (
    <Flex
      id="audio-player"
      justifyContent="center"
      flexDirection="column"
      gap="$6"
      css={{
        width: '320px',
        padding: '$7 $6',
        border: '$borderWidths$xs solid $black200',
        borderRadius: '$xl',
        transition: 'all 0.3s ease',

        '& #file-info, & #visualizer': {
          position: 'absolute',
          top: '$1',
          left: '$24',
          width: '214px',
          ...(small && {
            width: '224px',
          }),
        },
        '& #file-info': {
          transition: 'opacity 0.2s ease',
          pointerEvents: 'unset',
        },
        '& #visualizer': {
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
        },

        ...(controls?.playing && {
          '& #sparrow-attachments-thumbnail-actions': {
            opacity: 1,
          },
          '& #file-info': {
            opacity: 0,
            pointerEvents: 'none',
          },
          '& #visualizer': {
            opacity: 1,
            pointerEvents: 'unset',
          },
        }),

        '&:hover': {
          borderColorOpacity: ['$black900', 0.15],
          boxShadow: '0px 4px 8px 0px #0000000D',
          '& #sparrow-attachments-thumbnail-actions': {
            opacity: 1,
          },
        },
        ...(small && {
          padding: '$4',
        }),
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        gap="$6"
        grow={1}
        css={{ position: 'relative' }}
      >
        <Tooltip
          className="dm-sans"
          delayDuration={3000}
          content={
            controls?.playing
              ? I18n.t('attachments.audio.pause')
              : I18n.t('attachments.audio.play')
          }
          side="top"
        >
          <IconButton
            id="audio-player-play-button"
            size="lg"
            color="default"
            shape="round"
            icon={
              controls?.playing ? (
                <PauseIcon color="#64748B" />
              ) : (
                <PlayIcon color="#64748B" />
              )
            }
            onClick={handlePlayPause}
            css={{ flexShrink: 0 }}
          />
        </Tooltip>

        <Flex id="file-info" flexDirection="column">
          <Tooltip
            className="dm-sans"
            content={isOverflow ? data?.name : null}
            css={{ wordBreak: 'break-all' }}
          >
            <Text
              ref={fileNameRef}
              as="h5"
              weight="bold"
              truncate
              css={{ color: '$neutral900', whiteSpace: 'nowrap' }}
            >
              {data?.name}
            </Text>
          </Tooltip>
          <Text as="h5" size="xs" css={{ color: '$neutral800' }}>
            {formatTime(controls.duration) || '00:00'} (
            {data?.properties?.size && formatBytes(data.properties.size)})
          </Text>
        </Flex>

        <Flex
          id="visualizer"
          justifyContent="center"
          alignItems="center"
          grow={1}
        >
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
              as="h5"
              css={{
                color: '$neutral800',
              }}
            >
              {I18n.t('attachments.errorLoading')}
            </Text>
          ) : (
            <Flex
              gap="$2"
              justifyContent="space-between"
              css={{ width: '100%' }}
            >
              <Flex
                css={{
                  position: 'relative',
                  width: small ? '180px' : '170px',
                }}
              >
                <AudioVisualizer
                  blob={blob}
                  width={small ? 180 : 170}
                  height={36}
                  barWidth={2.4}
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
              <Flex alignItems="center" shrink={0} css={{ width: '$10' }}>
                <Text
                  as="h4"
                  weight="bold"
                  css={{
                    color: '$neutral800',
                  }}
                >
                  {formatTime(controls.played) || '00:00'}
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>

        <Flex shrink={0} alignItems="center">
          <Tooltip sideOffset={2} content={I18n.t('attachments.downloadFile')}>
            <IconButton
              id="sparrow-attachments-thumbnail-actions"
              alignItems="center"
              variant="ghost"
              color="default"
              icon={<DownloadIcon strokeWidth={2} size={20} />}
              css={{
                flexShrink: 0,
                transition: 'opacity 0.3s ease',
                opacity: '0',
                width: '$6',
              }}
              onClick={() => {
                if (handleDownload) {
                  handleDownload(data);
                } else {
                  downloadSrcAsFile(data.name, data.url);
                }
              }}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Audio;
