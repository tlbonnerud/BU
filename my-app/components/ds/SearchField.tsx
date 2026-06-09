'use client';

import React from 'react';

export interface SearchFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

/** SearchField — pill search input with leading magnifier + optional clear. */
export function SearchField({
  value,
  onClear,
  placeholder = 'Søk',
  ...rest
}: SearchFieldProps) {
  return (
    <div className="bdu-search">
      <span className="bdu-search__icon">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
      <input type="search" value={value} placeholder={placeholder} {...rest} />
      {value && onClear && (
        <button
          className="bdu-search__clear"
          onClick={onClear}
          aria-label="Tøm søk"
          type="button"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
