'use client';

import React from 'react';

export interface Crumb {
  label: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface BreadcrumbsProps {
  items?: Crumb[];
}

/** Breadcrumbs — path trail. `items: [{label, href, onClick}]`; last is current. */
export function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
  return (
    <nav className="bdu-crumbs" aria-label="Brødsmuler">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last ? (
              <span className="bdu-crumbs__current" aria-current="page">
                {it.label}
              </span>
            ) : (
              <a href={it.href} onClick={it.onClick}>
                {it.label}
              </a>
            )}
            {!last && (
              <span className="bdu-crumbs__sep">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
