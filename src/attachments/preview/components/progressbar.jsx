import React from 'react';

const ProgressBar = ({ value = 0, onChange }) => {
  return (
    <div className="w-full relative rounded-[30px] group">
      <input
        id="video-player-progress"
        type="range"
        step="0.1"
        value={value}
        onChange={onChange}
        className="w-full bg-transparent cursor-pointer py-3 appearance-none
          [&::-webkit-slider-runnable-track]:h-1.5
          [&::-webkit-slider-runnable-track]:rounded-[30px]
          [&::-webkit-slider-runnable-track]:bg-gray-200
          [&::-webkit-slider-runnable-track]:bg-no-repeat
          
          [&::-moz-range-track]:h-1.5
          [&::-moz-range-track]:rounded-[30px]
          [&::-moz-range-track]:bg-gray-200
          
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:-mt-0.5
          [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:rounded-[30px]
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:duration-100
          [&::-webkit-slider-thumb]:ease-in
          [&::-webkit-slider-thumb]:scale-0
          [&::-webkit-slider-thumb]:hover:shadow-[0px_0px_0px_6px_rgba(0,0,0,0.60)]
          
          [&::-moz-range-thumb]:h-3
          [&::-moz-range-thumb]:w-3
          [&::-moz-range-thumb]:bg-white
          [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:rounded-[30px]
          [&::-moz-range-thumb]:transition-transform
          [&::-moz-range-thumb]:duration-100
          [&::-moz-range-thumb]:ease-in
          [&::-moz-range-thumb]:scale-0
          [&::-moz-range-thumb]:hover:shadow-[0px_0px_0px_6px_rgba(0,0,0,0.60)]
          
          group-hover:[&::-webkit-slider-thumb]:scale-100!
          group-hover:[&::-moz-range-thumb]:scale-100!"
        style={{
          '--progress': `${value}%`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
