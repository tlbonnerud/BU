'use client';

import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

/** EmptyState — centered placeholder for empty lists/tables. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="bdu-empty">
      {icon && <div className="bdu-empty__icon">{icon}</div>}
      <div className="bdu-empty__title">{title}</div>
      {description && <div className="bdu-empty__desc">{description}</div>}
      {action && <div className="bdu-empty__action">{action}</div>}
    </div>
  );
}
