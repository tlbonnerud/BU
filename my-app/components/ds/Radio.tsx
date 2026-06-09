'use client';

import React from 'react';

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  sublabel?: React.ReactNode;
}

/** Radio — single-choice control with optional label + sublabel. */
export function Radio({ label, sublabel, disabled, ...rest }: RadioProps) {
  return (
    <label className={`bdu-radio ${disabled ? 'bdu-radio--disabled' : ''}`}>
      <input type="radio" disabled={disabled} {...rest} />
      <span className="bdu-radio__dot" />
      {(label || sublabel) && (
        <span>
          <span>{label}</span>
          {sublabel && <span className="bdu-radio__sub">{sublabel}</span>}
        </span>
      )}
    </label>
  );
}
