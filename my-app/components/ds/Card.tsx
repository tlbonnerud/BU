'use client';

import React from 'react';

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  padded?: boolean;
  elevation?: 'border' | 'shadow';
  hover?: boolean;
  as?: 'default' | 'stat';
  icon?: React.ReactNode;
  value?: React.ReactNode;
  delta?: React.ReactNode;
  deltaDir?: 'up' | 'down';
}

/** Card — white surface container. Set `as="stat"` for a KPI card. */
export function Card({
  children,
  title,
  subtitle,
  action,
  padded = true,
  elevation = 'border',
  hover = false,
  as = 'default',
  icon,
  value,
  delta,
  deltaDir = 'up',
  className = '',
  ...rest
}: CardProps) {
  const cls = [
    'bdu-card',
    padded && 'bdu-card--pad',
    elevation === 'shadow' && 'bdu-card--shadow',
    hover && 'bdu-card--hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (as === 'stat') {
    return (
      <div className={cls} {...rest}>
        <div className="bdu-stat">
          <span className="bdu-stat__label">
            {icon && <span className="bdu-stat__icon">{icon}</span>}
            {title}
          </span>
          <span className="bdu-stat__value">{value}</span>
          {delta && (
            <span className={`bdu-stat__delta bdu-stat__delta--${deltaDir}`}>
              {delta}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cls} {...rest}>
      {(title || action) && (
        <div className="bdu-card__head">
          <div>
            {title && <div className="bdu-card__title">{title}</div>}
            {subtitle && <div className="bdu-card__sub">{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
