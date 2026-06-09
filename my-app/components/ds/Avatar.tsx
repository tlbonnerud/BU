'use client';

import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline';
  ring?: boolean;
}

function initials(name = ''): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase();
}

function tintFor(name = ''): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h % 4;
}

/** Avatar — round user image or colour-tinted initials, with optional status dot. */
export function Avatar({
  name = '',
  src,
  size = 'md',
  status,
  ring,
  className = '',
  ...rest
}: AvatarProps) {
  const tint = src ? '' : `bdu-avatar-tints-${tintFor(name)}`;
  return (
    <span
      className={`bdu-avatar bdu-avatar--${size} ${tint} ${ring ? 'bdu-avatar__ring' : ''} ${className}`}
      title={name}
      {...rest}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt={name} /> : initials(name)}
      {status && (
        <span className={`bdu-avatar__status bdu-avatar__status--${status}`} />
      )}
    </span>
  );
}
