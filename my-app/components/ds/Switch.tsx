'use client';

import React from 'react';

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

/** Switch — on/off toggle. */
export function Switch({ label, disabled, ...rest }: SwitchProps) {
  return (
    <label className={`bdu-switch ${disabled ? 'bdu-switch--disabled' : ''}`}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="bdu-switch__track">
        <span className="bdu-switch__thumb" />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
