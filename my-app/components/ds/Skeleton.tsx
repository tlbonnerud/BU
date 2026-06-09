'use client';

import React from 'react';

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'box' | 'text' | 'circle';
  width?: number | string;
  height?: number | string;
}

/** Skeleton — shimmering loading placeholder. */
export function Skeleton({
  variant = 'box',
  width,
  height,
  className = '',
  style,
  ...rest
}: SkeletonProps) {
  const v =
    variant === 'text'
      ? 'bdu-skel--text'
      : variant === 'circle'
        ? 'bdu-skel--circle'
        : '';
  return (
    <span
      className={`bdu-skel ${v} ${className}`}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}

/** SkeletonRow — avatar + two text lines, e.g. a loading table/list row. */
export function SkeletonRow({ lines = 2 }: { lines?: number }) {
  return (
    <div className="bdu-skel-row">
      <Skeleton variant="circle" width={36} height={36} />
      <div className="bdu-skel-row__lines">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} variant="text" width={i === 0 ? '40%' : '70%'} />
        ))}
      </div>
    </div>
  );
}
