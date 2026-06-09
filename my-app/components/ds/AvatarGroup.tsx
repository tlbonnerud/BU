'use client';

import React from 'react';
import { Avatar, AvatarProps, AvatarSize } from './Avatar';

export type AvatarGroupUser = string | AvatarProps;

export interface AvatarGroupProps {
  users?: AvatarGroupUser[];
  max?: number;
  size?: Extract<AvatarSize, 'sm' | 'md'>;
}

/** AvatarGroup — overlapping avatars with a +N overflow chip. */
export function AvatarGroup({
  users = [],
  max = 4,
  size = 'md',
}: AvatarGroupProps) {
  const shown = users.slice(0, max);
  const extra = users.length - shown.length;
  return (
    <span className="bdu-avgroup">
      {shown.map((u, i) => (
        <Avatar
          key={i}
          size={size}
          {...(typeof u === 'string' ? { name: u } : u)}
        />
      ))}
      {extra > 0 && (
        <span className={`bdu-avgroup__more bdu-avgroup__more--${size}`}>
          +{extra}
        </span>
      )}
    </span>
  );
}
