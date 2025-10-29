import React from 'react';
import { Flex, styled } from '@sparrowengg/twigs-react';

const StyledProgressBar = styled('input', {
  '-webkit-appearance': 'none',
  width: '100%',
  background: 'transparent',
  cursor: 'pointer',
  paddingBlock: '$3',

  '&::-webkit-slider-runnable-track': {
    height: '6px',
    borderRadius: '30px',
    '--sx': 'calc(1 * 10px + calc(var(--value) / 100) * (100% - 10px))',
    background:
      'linear-gradient($white800, $white800) 0/var(--sx) 100% no-repeat, $white500',
  },

  '&::-moz-range-track': {
    height: '6px',
    borderRadius: '30px',
    '--sx': 'calc(1 * 10px + calc(var(--value) / 100) * (100% - 10px))',
    background:
      'linear-gradient($white800, $white800) 0/var(--sx) 100% no-repeat, $white500',
  },

  '&::-ms-track': {
    height: '6px',
    borderRadius: '30px',
    '--sx': 'calc(1 * 10px + calc(var(--value) / 100) * (100% - 10px))',
    background:
      'linear-gradient($white800, $white800) 0/var(--sx) 100% no-repeat, $white500',
    borderColor: 'transparent',
    color: 'transparent',
  },

  '&::-webkit-slider-thumb': {
    '-webkit-appearance': 'none',
    appearance: 'none',
    height: '12px',
    width: '12px',
    marginTop: '-3px',
    background: '$white900',
    borderRadius: '30px',
    transition:
      'transform .1s cubic-bezier(.4,0,1,1), -webkit-transform .1s cubic-bezier(.4,0,1,1)',
    transform: 'scale(0)',
    '&:hover': {
      boxShadow: '0px 0px 0px 6px rgba(0, 0, 0, 0.60)',
    },
  },

  '&::-moz-range-thumb': {
    height: '12px',
    width: '12px',
    marginTop: '-3px',
    background: '$white900',
    borderRadius: '30px',
    transition:
      'transform .1s cubic-bezier(.4,0,1,1), -webkit-transform .1s cubic-bezier(.4,0,1,1)',
    transform: 'scale(0)',
    '&:hover': {
      boxShadow: '0px 0px 0px 6px rgba(0, 0, 0, 0.60)',
    },
  },

  '&::-ms-thumb': {
    height: '12px',
    width: '12px',
    marginTop: '-3px',
    background: '$white900',
    borderRadius: '30px',
    transition:
      'transform .1s cubic-bezier(.4,0,1,1), -webkit-transform .1s cubic-bezier(.4,0,1,1)',
    transform: 'scale(0)',
    '&:hover': {
      boxShadow: '0px 0px 0px 6px rgba(0, 0, 0, 0.60)',
    },
  },
});

const ProgressBar = ({ value = 0, onChange }) => {
  return (
    <Flex
      css={{
        width: '100%',
        position: 'relative',
        borderRadius: '30px',
        '&:hover': {
          '& #video-player-progress::-webkit-slider-thumb': {
            transform: 'scale(1) !important',
          },
        },
      }}
    >
      <StyledProgressBar
        id="video-player-progress"
        type="range"
        step="000.1"
        {...{
          value,
          onChange,
        }}
      />
    </Flex>
  );
};
export default ProgressBar;
