'use client';

import React, { useId } from 'react';

export type SelectOption = string | { value: string; label: string };

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  placeholder?: string;
  label?: React.ReactNode;
}

/** Select — native dropdown styled to match Input. Optional field label. */
export function Select({
  options = [],
  placeholder,
  label,
  required,
  className = '',
  id,
  children,
  ...rest
}: SelectProps) {
  const reactId = useId();
  const fid = id || reactId;

  const control = (
    <span className="bdu-select-wrap">
      <select
        id={fid}
        className={`bdu-select ${className}`}
        required={required}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
        {children}
      </select>
      <svg
        className="bdu-select-wrap__chev"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );

  if (!label) return control;

  return (
    <div className="bdu-field">
      <label className="bdu-field__label" htmlFor={fid}>
        {label}
        {required && <span className="bdu-field__req">*</span>}
      </label>
      {control}
    </div>
  );
}
