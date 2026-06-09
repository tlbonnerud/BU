'use client';

import React from 'react';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
}

/** Checkbox — square check with optional label + sublabel. */
export function Checkbox({ label, sublabel, disabled, ...rest }: CheckboxProps) {
  return (
    <label className={`bdu-check ${disabled ? 'bdu-check--disabled' : ''}`}>
      <input type="checkbox" disabled={disabled} {...rest} />
      <span className="bdu-check__box">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {(label || sublabel) && (
        <span>
          <span>{label}</span>
          {sublabel && <span className="bdu-check__sub">{sublabel}</span>}
        </span>
      )}
    </label>
  );
}
