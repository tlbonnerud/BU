'use client';

import React from 'react';

export interface TopbarProps {
  title?: React.ReactNode;
  search?: React.ReactNode;
  actions?: React.ReactNode;
  user?: React.ReactNode;
  onNotify?: () => void;
}

/** Topbar — logged-in app header: page title, search slot, actions, user. */
export function Topbar({ title, search, actions, user, onNotify }: TopbarProps) {
  return (
    <header className="bdu-topbar">
      {title && <span className="bdu-topbar__title">{title}</span>}
      <div className="bdu-topbar__spacer" />
      {search && <div className="bdu-topbar__search">{search}</div>}
      {actions}
      <button
        className="bdu-topbar__btn"
        aria-label="Varsler"
        onClick={onNotify}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        <span className="bdu-topbar__dot" />
      </button>
      {user && (
        <>
          <span className="bdu-topbar__divider" />
          <div className="bdu-topbar__user">{user}</div>
        </>
      )}
    </header>
  );
}
