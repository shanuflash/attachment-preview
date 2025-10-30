import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { AudioVisualizer } from 'react-audio-visualize';
import { downloadSrcAsFile, formatTime } from '../common/helpers';
import PauseIcon from '../common/icons/pauseicon';
import PlayIcon from '../common/icons/playicon';
import TrackBar from './components/trackbar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

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
    <div
      id="audio-player"
      className={`flex justify-center flex-col gap-6 w-80 border border-gray-200 rounded-xl transition-all duration-300 
        ${small ? 'p-4' : 'p-7 px-6'}
        [&_#file-info]:absolute [&_#file-info]:top-1 [&_#file-info]:left-24 [&_#file-info]:transition-opacity [&_#file-info]:duration-200 [&_#file-info]:pointer-events-auto
        [&_#visualizer]:absolute [&_#visualizer]:top-1 [&_#visualizer]:left-24 [&_#visualizer]:opacity-0 [&_#visualizer]:pointer-events-none [&_#visualizer]:transition-opacity [&_#visualizer]:duration-300
        ${small ? '[&_#file-info]:w-56 [&_#visualizer]:w-56' : '[&_#file-info]:w-[214px] [&_#visualizer]:w-[214px]'}
        ${controls?.playing ? '[&_#sparrow-attachments-thumbnail-actions]:opacity-100 [&_#file-info]:opacity-0 [&_#file-info]:pointer-events-none [&_#visualizer]:opacity-100 [&_#visualizer]:pointer-events-auto' : ''}
        hover:border-gray-900/15 hover:shadow-[0px_4px_8px_0px_#0000000D] hover:[&_#sparrow-attachments-thumbnail-actions]:opacity-100`}
    >
      <div className="flex items-center justify-between gap-6 grow relative">
        <TooltipProvider>
          <Tooltip delayDuration={3000}>
            <TooltipTrigger asChild>
              <Button
                id="audio-player-play-button"
                size="lg"
                variant="outline"
                className="shrink-0 rounded-full h-10 w-10 p-0"
                onClick={handlePlayPause}
              >
                {controls?.playing ? (
                  <PauseIcon color="#64748B" />
                ) : (
                  <PlayIcon color="#64748B" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="dm-sans">
              {controls?.playing ? 'Pause' : 'Play'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div id="file-info" className="flex flex-col">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h5
                  ref={fileNameRef}
                  className="font-bold text-neutral-900 whitespace-nowrap truncate"
                >
                  {data?.name}
                </h5>
              </TooltipTrigger>
              {isOverflow && (
                <TooltipContent className="dm-sans break-all">
                  {data?.name}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <h5 className="text-xs text-neutral-800">
            {formatTime(controls.duration) || '00:00'} (
            {data?.properties?.size && formatBytes(data.properties.size)})
          </h5>
        </div>

        <div id="visualizer" className="flex justify-center items-center grow">
          {blobLoading ? (
            <div className="w-full h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-secondary animate-pulse"></div>
            </div>
          ) : error ? (
            <h5 className="text-neutral-800">Error loading audio</h5>
          ) : (
            <div className="flex gap-2 justify-between w-full">
              <div
                className="relative"
                style={{ width: small ? '180px' : '170px' }}
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
              </div>
              <div className="flex items-center shrink-0 w-10">
                <h4 className="font-bold text-neutral-800">
                  {formatTime(controls.played) || '00:00'}
                </h4>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  id="sparrow-attachments-thumbnail-actions"
                  variant="ghost"
                  size="icon"
                  className="shrink-0 transition-opacity duration-300 opacity-0 w-6 h-6"
                  onClick={() => {
                    if (handleDownload) {
                      handleDownload(data);
                    } else {
                      downloadSrcAsFile(data.name, data.url);
                    }
                  }}
                >
                  <Download className="h-5 w-5" strokeWidth={2} />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={2}>Download File</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Audio;
