'use client';

import React from 'react';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: 'plain' | 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

/** IconButton — square button holding a single icon. */
export function IconButton({
  children,
  label,
  variant = 'plain',
  size = 'md',
  ...rest
}: IconButtonProps) {
  const cls = [
    'bdu-iconbtn',
    `bdu-iconbtn--${size}`,
    variant === 'solid' && 'bdu-iconbtn--solid',
    variant === 'outline' && 'bdu-iconbtn--outline',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}
