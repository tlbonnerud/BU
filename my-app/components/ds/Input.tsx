'use client';

import React, { useId } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  icon?: React.ReactNode;
}

/** Input — labelled text field with hint, error, and optional leading icon. */
export function Input({
  label,
  hint,
  error,
  required,
  icon,
  id,
  className = '',
  ...rest
}: InputProps) {
  const reactId = useId();
  const fid = id || reactId;

  return (
    <div className="bdu-field">
      {label && (
        <label className="bdu-field__label" htmlFor={fid}>
          {label}
          {required && <span className="bdu-field__req">*</span>}
        </label>
      )}
      <div className="bdu-input-wrap">
        {icon && <span className="bdu-input-wrap__icon">{icon}</span>}
        <input
          id={fid}
          className={`bdu-input ${icon ? 'bdu-input--icon' : ''} ${error ? 'bdu-input--error' : ''} ${className}`}
          aria-invalid={!!error}
          required={required}
          {...rest}
        />
      </div>
      {error ? (
        <span className="bdu-field__err">{error}</span>
      ) : (
        hint && <span className="bdu-field__hint">{hint}</span>
      )}
    </div>
  );
}
