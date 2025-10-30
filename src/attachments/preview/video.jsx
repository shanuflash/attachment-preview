import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Play, Pause, Loader2 } from 'lucide-react';
import { formatTime } from '../common/helpers';

const Video = ({ data = {} }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const valueRef = useRef({
    duration: 0,
    playedSeconds: 0,
  });

  const [controls, setControls] = useState({
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
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);

  const handlePlayPause = () => {
    setControls((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const handleSeek = (value) => {
    const newValue = value[0] / 100;
    videoRef.current.seekTo(newValue, 'fraction');
    setControls((prev) => ({
      ...prev,
      played: newValue,
    }));
  };

  const handleProgress = (value) => {
    valueRef.current.playedSeconds = value.playedSeconds;
    setControls((prev) => ({ ...prev, played: value.played }));

    if (value.played === 1) {
      setControls((prev) => ({ ...prev, playing: false }));
    }
  };

  useEffect(() => {
    setControls((prev) => ({ ...prev, playing: true }));
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'Space':
        case 'KeyK': {
          handlePlayPause();
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
  }, []);

  useEffect(() => {
    const video = document.getElementById('video-player-src');
    const canvas = canvasRef.current;

    if (!video || !canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    function getCurrentImage() {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const intervalId = setInterval(getCurrentImage, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="w-full [&_video]:max-h-full" onClick={handlePlayPause}>
        {loading && (
          <div className="absolute z-10 h-full w-full bg-black/40 flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
        )}
        {buffering && (
          <div className="absolute z-10 h-full w-full bg-black/10 flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
        )}
        {error && (
          <div className="absolute z-10 h-full w-full bg-black/50 text-white flex items-center justify-center">
            Error loading video
          </div>
        )}
        <ReactPlayer
          ref={videoRef}
          src={data?.url}
          config={{
            file: {
              attributes: {
                className: 'video',
                id: 'video-player-src',
              },
            },
          }}
          onReady={() => setLoading(false)}
          onBuffer={() => setBuffering(true)}
          onBufferEnd={() => setBuffering(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          onProgress={handleProgress}
          onDuration={(duration) => {
            setControls((prev) => ({ ...prev, duration }));
            valueRef.current.duration = duration;
          }}
          progressInterval={10}
          {...controls}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg opacity-70 bg-black"
          style={{ filter: 'blur(100px)' }}
        />
      </div>
      <div className="absolute z-10 bottom-0 left-0 w-full h-20 px-10 py-6 flex items-center gap-4 bg-linear-to-t from-black/60 to-transparent">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-white hover:bg-white/10"
                onClick={handlePlayPause}
              >
                {controls.playing ? (
                  <Pause className="h-5 w-5 fill-white" />
                ) : (
                  <Play className="h-5 w-5 fill-white" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {controls.playing ? 'Pause' : 'Play'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Slider
          value={[controls.played * 100]}
          onValueChange={handleSeek}
          max={100}
          step={0.1}
          className="flex-1"
        />

        <div className="shrink-0 pl-2 text-white text-sm font-bold">
          <span>{formatTime(valueRef.current.playedSeconds)}</span>
          <span className="text-white/80 font-medium">
            {' '}
            / {formatTime(valueRef.current.duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Video;
