import React, { useRef, useState } from 'react';
import {
  Flex,
  Box,
  CircleLoader,
  IconButton,
  Text,
  Tooltip,
} from '@sparrowengg/twigs-react';
import { MinusIcon, PlusIcon } from '@sparrowengg/twigs-react-icons';

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
    imageRef.current.style.transform = `translate3d(${position?.x ?? 0}px, ${position?.y ?? 0}px, 0px) rotate(0deg) scale(${imageScale}, ${imageScale})`;
    setScale(imageScale);
    setIsZoomed(isZoomed);
    setTimeout(() => {
      setRunOnce(true);
    }, 500);
  };

  const handleZoomIn = (position = null) => {
    // Round up to nearest 0.5, add 0.5, and cap at 2x zoom. e.g. 1.2 -> 1.5 -> 2.0
    const newScale = Math.min(Math.ceil(scale * 2) / 2 + 0.5, 2);
    setImageScale(newScale, position, true);
  };

  const handleZoomOut = () => {
    // Round down to nearest 0.5, subtract 0.5, and don't go below default scale. e.g. 1.8 -> 1.5 -> 1.0
    const newScale = Math.max(Math.floor(scale * 2) / 2 - 0.5, defaultScale);
    setPosition({ x: 0, y: 0 });
    setImageScale(newScale, null, !(newScale === defaultScale));
  };

  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Calculate center point
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate coordinates relative to center
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

    // Calculate bounds for x movement
    const imageWidth = imageRef.current.clientWidth * scale;
    const containerWidth = containerRef.current.clientWidth;
    const maxX = Math.max(
      (imageWidth - containerWidth) / 2,
      containerWidth / 4
    );
    const minX = -maxX;

    // Calculate bounds for y movement
    const imageHeight = imageRef.current.clientHeight * scale;
    const containerHeight = containerRef.current.clientHeight;
    const maxY = Math.max(
      (imageHeight - containerHeight) / 2,
      containerHeight / 4
    );
    const minY = -maxY;

    // Clamp x and y positions between bounds
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
        ref={imageRef}
        src={data?.url}
        id="image-viewer-src"
        as="img"
        onLoad={() => setImageScale(null, null, false)}
        onError={() => {}}
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
        css={{
          zIndex: 2,
          userSelect: 'none',
          cursor: isDragging ? 'grabbing' : isZoomed ? 'grab' : 'zoom-in',
          transition:
            isDragging || !runOnce ? 'none' : 'transform 0.2s ease-in-out',
        }}
      />
      <Box
        id="image-viewer-background"
        css={{
          zIndex: 1,
          position: 'absolute',
          background: `url(${data?.url})`,
          pointerEvents: 'none',
          filter: 'blur(40px) brightness(.4)',
          backgroundColor: '#000',
          backgroundPosition: '50%',
          backgroundSize: 'cover',
          inset: '-100px',
        }}
      />
      <Flex
        id="image-viewer-magnifier"
        alignItems="center"
        justifyContent="center"
        css={{
          position: 'absolute',
          zIndex: 3,
          bottom: '$8',
          left: '$8',
          border: '1.2px solid $white500',
          borderRadius: '$lg',
        }}
      >
        <Tooltip sideOffset={4} content="Zoom out">
          <IconButton
            variant="ghost"
            color="light"
            size="lg"
            icon={<MinusIcon />}
            css={{
              borderTopRightRadius: '$none',
              borderBottomRightRadius: '$none',
            }}
            disabled={scale === defaultScale}
            onClick={() => handleZoomOut()}
          />
        </Tooltip>
        <Text
          as="span"
          css={{ textAlign: 'center', width: '$12', color: '$white900' }}
        >
          {Math.round(scale * 100)}%
        </Text>
        <Tooltip sideOffset={4} content="Zoom in">
          <IconButton
            variant="ghost"
            color="light"
            size="lg"
            icon={<PlusIcon />}
            css={{
              borderTopLeftRadius: '$none',
              borderBottomLeftRadius: '$none',
            }}
            disabled={scale === 2}
            onClick={() => handleZoomIn()}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Image;
