import React, { forwardRef, useMemo } from 'react';
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export const avatarColors = [
  { bg: '#F4BEB44D', text: '#AB857E' },
  { bg: '#A65E6E4D', text: '#74424D' },
  { bg: '#C083D84D', text: '#865C97' },
  { bg: '#5F5CB04D', text: '#43407B' },
  { bg: '#7158F54D', text: '#4F3EAC' },
  { bg: '#84BCEF4D', text: '#5C84A7' },
];

const Avatar = forwardRef((props, ref) => {
  const { name, src, className, ...rest } = props;

  const randomColor = useMemo(() => {
    const firstLetter = name?.charAt(0).toUpperCase() ?? '?';
    return avatarColors[(firstLetter.charCodeAt() % 65) % avatarColors.length];
  }, [name]);

  const initials = useMemo(() => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  }, [name]);

  return (
    <ShadcnAvatar
      ref={ref}
      className={cn('cursor-pointer bg-white', className)}
      {...rest}
    >
      {src && <AvatarImage src={src} alt={name} />}
      <AvatarFallback
        style={{
          backgroundColor: randomColor.bg,
          color: randomColor.text,
        }}
      >
        {initials}
      </AvatarFallback>
    </ShadcnAvatar>
  );
});

Avatar.displayName = 'Avatar';

export const AvatarBadge = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-accent border-2 border-white transform translate-x-1/4 -translate-y-1/4',
      className
    )}
    {...props}
  />
));

AvatarBadge.displayName = 'AvatarBadge';

export default Avatar;
