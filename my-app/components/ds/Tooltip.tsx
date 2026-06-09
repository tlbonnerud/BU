'use client';

import React from 'react';

export interface TooltipProps {
  label: React.ReactNode;
  placement?: 'top' | 'bottom' | 'right';
  children?: React.ReactNode;
}

/** Tooltip — hover/focus hint wrapping a trigger. */
export function Tooltip({ label, placement = 'top', children }: TooltipProps) {
  return (
    <span className="bdu-tooltip" tabIndex={0}>
      {children}
      <span
        className={`bdu-tooltip__pop bdu-tooltip__pop--${placement}`}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
}
