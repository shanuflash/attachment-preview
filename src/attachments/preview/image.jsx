import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Minus, Plus, Loader2 } from 'lucide-react';

const Image = ({ data }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [runOnce, setRunOnce] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [defaultScale, setDefaultScale] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const setImageScale = (scale = null, position = null, isZoomed = true) => {
    if (!containerRef.current || !imageRef.current) return;
    setLoading(false);
    let imageScale = 1;
    if (scale) {
      imageScale = scale;
    } else {
      const containerHeight = containerRef.current?.clientHeight;
      const imageHeight = imageRef.current?.clientHeight;
      imageScale = Math.min(containerHeight / imageHeight, 1);
      setDefaultScale(imageScale);
    }
    imageRef.current.style.transform = `translate3d(${position?.x ?? 0}px, ${position?.y ?? 0}px, 0px) scale(${imageScale})`;
    setScale(imageScale);
    setIsZoomed(isZoomed);
    setTimeout(() => {
      setRunOnce(true);
    }, 500);
  };

  const handleZoomIn = (position = null) => {
    const newScale = Math.min(Math.ceil(scale * 2) / 2 + 0.5, 2);
    setImageScale(newScale, position, true);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(Math.floor(scale * 2) / 2 - 0.5, defaultScale);
    setPosition({ x: 0, y: 0 });
    setImageScale(newScale, null, !(newScale === defaultScale));
  };

  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = -(e.clientX - rect.left - centerX);
    const y = -(e.clientY - rect.top - centerY);
    setPosition({ x, y });
    handleZoomIn({ x, y });
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    if (!isZoomed) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleDragMove = (e) => {
    if (!isDragging || !isZoomed) return;
    const imageWidth = imageRef.current.clientWidth * scale;
    const containerWidth = containerRef.current.clientWidth;
    const maxX = Math.max((imageWidth - containerWidth) / 2, containerWidth / 4);
    const minX = -maxX;
    const imageHeight = imageRef.current.clientHeight * scale;
    const containerHeight = containerRef.current.clientHeight;
    const maxY = Math.max((imageHeight - containerHeight) / 2, containerHeight / 4);
    const minY = -maxY;
    const rawX = e.clientX - dragStart.x;
    const rawY = e.clientY - dragStart.y;
    const newX = Math.min(Math.max(rawX, minX), maxX);
    const newY = Math.min(Math.max(rawY, minY), maxY);
    setPosition({ x: newX, y: newY });
    setImageScale(scale, { x: newX, y: newY }, true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="flex justify-center items-center h-full w-full relative"
      ref={containerRef}
    >
      {loading && (
        <div className="absolute z-10 h-full w-full bg-black/40 flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-white animate-spin" />
        </div>
      )}
      <img
        ref={imageRef}
        src={data?.url}
        alt={data?.name}
        onLoad={() => setImageScale(null, null, false)}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          if (isZoomed) {
            handleDragStart(e);
          } else {
            handleImageClick(e);
          }
        }}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerLeave={handleDragEnd}
        className="z-[2] select-none"
        style={{
          cursor: isDragging ? 'grabbing' : isZoomed ? 'grab' : 'zoom-in',
          transition: isDragging || !runOnce ? 'none' : 'transform 0.2s ease-in-out',
        }}
      />
      <div
        className="z-[1] absolute inset-[-100px] pointer-events-none bg-black"
        style={{
          background: `url(${data?.url})`,
          filter: 'blur(40px) brightness(.4)',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
        }}
      />
      <div className="absolute z-10 bottom-8 left-8 flex items-center justify-center border border-white/50 rounded-lg overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none bg-transparent hover:bg-white/10 text-white"
                disabled={scale === defaultScale}
                onClick={() => handleZoomOut()}
              >
                <Minus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-center w-12 text-white text-sm">
          {Math.round(scale * 100)}%
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none bg-transparent hover:bg-white/10 text-white"
                disabled={scale === 2}
                onClick={() => handleZoomIn()}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom in</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Image;
