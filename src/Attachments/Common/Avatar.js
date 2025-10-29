import { styled, Avatar as TwigsAvatar } from '@sparrowengg/twigs-react';
import React, { forwardRef, useMemo } from 'react';

export const avatarColors = [
  { bg: '#F4BEB44D', text: '#AB857E' },
  { bg: '#A65E6E4D', text: '#74424D' },
  { bg: '#C083D84D', text: '#865C97' },
  { bg: '#5F5CB04D', text: '#43407B' },
  { bg: '#7158F54D', text: '#4F3EAC' },
  { bg: '#84BCEF4D', text: '#5C84A7' },
];

const Avatar = forwardRef((props, ref) => {
  const randomColor = useMemo(() => {
    const firstLetter = props.name?.charAt(0).toUpperCase() ?? '?';
    return avatarColors[(firstLetter.charCodeAt() % 65) % avatarColors.length];
  }, [props.name]);

  return (
    <TwigsAvatar
      ref={ref}
      {...props}
      css={{
        cursor: 'pointer',
        backgroundColor: '$white900',
        '& > span': {
          backgroundColor: `${randomColor.bg} !important`,
          color: `${randomColor.text} !important`,
        },
        ...props.css,
      }}
    />
  );
});

export const AvatarBadge = styled('div', {
  borderRadius: '$round',
  position: 'absolute',
  background: '$accent500',
  border: '$borderWidths$sm',
  borderStyle: 'solid',
  borderColor: '$white900',
  right: '-$1',
  top: 0,
  height: '10px',
  width: '10px',
  transform: 'translate(25%, -25%)',
});

export default Avatar;
