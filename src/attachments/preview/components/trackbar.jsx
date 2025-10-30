import React, { useRef } from 'react';

const TrackBar = ({ setCurrent, total }) => {
  const progressBarRef = useRef(null);

  const getClientX = (event) => {
    if (event instanceof TouchEvent) {
      return event.touches[0].clientX;
    }
    return event.clientX;
  };

  const onMouseOrTouchMove = (event) => {
    setPosition(event);
  };

  const setPosition = (event) => {
    if (!progressBarRef.current) return;

    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const maxRelativePos = progressBarRect.width;
    const relativePos = getClientX(event) - progressBarRect.left;

    if (relativePos < 0) {
      setCurrent(0);
    } else if (relativePos > maxRelativePos) {
      setCurrent(total);
    } else {
      setCurrent((total * relativePos) / maxRelativePos);
    }
  };

  const onMouseDownOrTouchStart = (event) => {
    if (event.nativeEvent instanceof MouseEvent) {
      window.addEventListener('mousemove', onMouseOrTouchMove);
      window.addEventListener('mouseup', onMouseOrTouchUp);
    } else {
      window.addEventListener('touchmove', onMouseOrTouchMove);
      window.addEventListener('touchend', onMouseOrTouchUp);
    }

    setPosition(event.nativeEvent);
  };

  const onMouseOrTouchUp = (event) => {
    if (event instanceof MouseEvent) {
      window.removeEventListener('mousemove', onMouseOrTouchMove);
      window.removeEventListener('mouseup', onMouseOrTouchUp);
    } else {
      window.removeEventListener('touchmove', onMouseOrTouchMove);
      window.removeEventListener('touchend', onMouseOrTouchUp);
    }
  };

  return (
    <div
      ref={progressBarRef}
      className="absolute h-full w-full cursor-pointer flex items-center"
      onMouseDown={onMouseDownOrTouchStart}
      onTouchStart={onMouseDownOrTouchStart}
    />
  );
};

export default TrackBar;
