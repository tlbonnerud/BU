'use client';

import React from 'react';

export type StatusKind =
  | 'aktiv'
  | 'inaktiv'
  | 'invitert'
  | 'godkjent'
  | 'venter';

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: StatusKind;
}

const LABELS: Record<StatusKind, string> = {
  aktiv: 'Aktiv',
  inaktiv: 'Inaktiv',
  invitert: 'Invitert',
  godkjent: 'Godkjent',
  venter: 'Venter',
};

/** StatusPill — dotted status indicator for users/hours. */
export function StatusPill({
  status = 'aktiv',
  children,
  ...rest
}: StatusPillProps) {
  return (
    <span className={`bdu-status bdu-status--${status}`} {...rest}>
      <span className="bdu-status__dot" />
      {children || LABELS[status] || status}
    </span>
  );
}
