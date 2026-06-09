'use client';

import React from 'react';

export type BadgeTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'solid'
  | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  icon?: React.ReactNode;
}

/** Badge — small count/label pill. */
export function Badge({
  children,
  tone = 'neutral',
  icon,
  ...rest
}: BadgeProps) {
  return (
    <span className={`bdu-badge bdu-badge--${tone}`} {...rest}>
      {icon}
      {children}
    </span>
  );
}
