import { useEffect, useRef, useState } from 'react';
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaPlayButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaLoadingIndicator,
} from 'media-chrome/react';

const Video = ({ data = {} }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {};

    const handleError = () => {
      setError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    ctx.filter = 'blur(1px)';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    let intervalId;

    const draw = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    const startLoop = () => {
      draw();
      intervalId = setInterval(draw, 150);
    };

    const stopLoop = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const handlers = {
      loadeddata: draw,
      seeked: draw,
      play: startLoop,
      pause: stopLoop,
      ended: stopLoop,
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      video.addEventListener(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        video.removeEventListener(event, handler);
      });
      stopLoop();
    };
  }, []);

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <MediaController
        autohide={-1}
        noAutohide={true}
        className="w-full h-full flex items-center justify-center"
        style={{
          '--media-object-fit': 'contain',
          '--media-object-position': 'center',
        }}
      >
        {error && (
          <div className="absolute z-100 h-full w-full bg-black/50 text-white flex items-center justify-center pointer-events-none">
            Error loading video
          </div>
        )}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg opacity-70 bg-black pointer-events-none"
          style={{
            filter: 'blur(50px)',
            zIndex: 0,
            width: '100%',
            height: '100%',
          }}
        />
        <video
          ref={videoRef}
          slot="media"
          src={data?.url}
          preload="auto"
          playsInline
          autoPlay
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
          className="z-10"
        />
        <MediaLoadingIndicator slot="centered-chrome"></MediaLoadingIndicator>

        <MediaControlBar
          className="absolute bottom-0 left-0 w-full px-6 py-4 flex items-center z-20"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          }}
        >
          <MediaPlayButton
            noTooltip
            className="mr-2 w-9 h-9 rounded-full bg-transparent hover:bg-white/20 text-white transition-all flex items-center justify-center border-none cursor-pointer active:scale-[0.97]"
          />
          <MediaSeekBackwardButton
            noTooltip
            seekOffset={10}
            className="mr-2 w-9 h-9 rounded-full bg-transparent hover:bg-white/20 text-white transition-all flex items-center justify-center border-none cursor-pointer active:scale-[0.97]"
          />
          <MediaSeekForwardButton
            noTooltip
            seekOffset={10}
            className="mr-2 w-9 h-9 rounded-full bg-transparent hover:bg-white/20 text-white transition-all flex items-center justify-center border-none cursor-pointer active:scale-[0.97]"
          />
          <MediaTimeDisplay
            showDuration
            className="text-white text-sm font-medium mr-2"
          />

          <MediaTimeRange className="flex-1 h-1 rounded-full bg-transparent" />

          <MediaMuteButton className="w-9 h-9 rounded-full bg-transparent hover:bg-white/20 text-white transition-all flex items-center justify-center border-none cursor-pointer active:scale-[0.97]" />
          <MediaVolumeRange className="w-20 h-1 rounded-full bg-transparent" />
          <MediaPlaybackRateButton className="w-auto px-3 h-9 rounded-full bg-transparent hover:bg-white/20 text-white text-sm transition-all flex items-center justify-center border-none cursor-pointer active:scale-[0.97]" />
        </MediaControlBar>
      </MediaController>
    </div>
  );
};

export default Video;
