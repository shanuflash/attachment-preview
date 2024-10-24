import { Flex, LineLoader, Text } from '@sparrowengg/twigs-react';
import React, { useEffect, useState } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';
import { formatTime } from '../../Preview/Video';
import { PlayFillIcon } from '@sparrowengg/twigs-react-icons';

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

const AudioPlayer = ({ data = {}, setCurrentData, setOpen }) => {
  const [audio] = useState(() => new Audio());
  const [blob, setBlob] = useState();
  const [blobLoading, setBlobLoading] = useState(true);

  const [controls, setControls] = useState(defaultControls);

  useEffect(() => {
    fetch(data.url)
      .then(async (response) => {
        const blob = await response.blob();
        audio.src = URL.createObjectURL(blob);
        audio.volume = 0.5;
        audio.loop = false;
        audio.muted = false;
        audio.autoplay = false;
        audio.preload = 'metadata';
        audio.playbackRate = 1.0;

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
  }, [open]);

  return (
    <Flex
      css={{
        position: 'relative',
        height: '$16',
        width: '346px',
        padding: '$6 $12 $6 $8',
        border: '1.5px solid #00000014',
        borderRadius: '$xl',
        cursor: 'pointer',
      }}
      gap="$6"
      alignItems="center"
      onClick={() => {
        setCurrentData(data);
        setOpen((prev) => ({ ...prev, audio: true }));
      }}
    >
      <PlayFillIcon size={40} color="#64748B" />
      <Flex justifyContent="center" alignItems="center" grow={1}>
        {blobLoading ? (
          <LineLoader
            color="secondary"
            size="xl"
            css={{
              width: '100%',
              background: '$neutral100',
            }}
          />
        ) : (
          <AudioVisualizer
            blob={blob}
            width={200}
            height={40}
            barWidth={3}
            gap={4}
            barColor="#E2E6EB"
            barPlayedColor="#64748B"
            currentTime={0}
          />
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
  );
};

const Audios = ({ data = [], setCurrentData, setOpen }) => {
  return (
    <Flex css={{ position: 'relative' }} gap="$4" wrap="wrap">
      {data.map((audio) => (
        <AudioPlayer
          key={audio.id}
          data={audio}
          {...{ setCurrentData, setOpen }}
        />
      ))}
    </Flex>
  );
};

export default Audios;
