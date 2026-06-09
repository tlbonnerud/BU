'use client';

import React from 'react';

export type AvailState = 'can' | 'want' | 'off';

export interface WeekDay {
  name: React.ReactNode;
  date?: React.ReactNode;
  today?: boolean;
}

export interface WeekGridProps {
  days?: WeekDay[];
  slots?: React.ReactNode[];
  states?: Record<string, AvailState>;
  onCellClick?: (dayIndex: number, slotIndex: number) => void;
  cell?: (dayIndex: number, slotIndex: number) => React.ReactNode;
  timeColWidth?: number;
}

const STATE_LABEL: Record<AvailState, string> = {
  can: 'Kan',
  want: 'Ønsker',
  off: '',
};

/**
 * WeekGrid — days × time-slots grid for availability marking and schedule display.
 * `days: [{name,date,today}]`, `slots: ['08–10', …]`.
 * Availability: pass `states` map `"d-s" -> 'can'|'want'|'off'` + `onCellClick(d,s)`.
 * Schedule: pass `cell(d,s) -> node` to render shift blocks.
 */
export function WeekGrid({
  days = [],
  slots = [],
  states = {},
  onCellClick,
  cell,
  timeColWidth = 64,
}: WeekGridProps) {
  return (
    <div className="bdu-week">
      <div
        className="bdu-week__grid"
        style={{
          gridTemplateColumns: `${timeColWidth}px repeat(${days.length}, 1fr)`,
        }}
      >
        <div className="bdu-week__corner" />
        {days.map((d, i) => (
          <div
            key={i}
            className={`bdu-week__day ${d.today ? 'bdu-week__day--today' : ''}`}
          >
            <span className="bdu-week__day-name">{d.name}</span>
            {d.date && <span className="bdu-week__day-date">{d.date}</span>}
          </div>
        ))}
        {slots.map((slot, si) => (
          <React.Fragment key={si}>
            <div className="bdu-week__time">{slot}</div>
            {days.map((d, di) => {
              const st = states[`${di}-${si}`];
              const custom = cell && cell(di, si);
              return (
                <div
                  key={di}
                  className={`bdu-week__cell ${onCellClick ? 'bdu-week__cell--click' : ''}`}
                  onClick={
                    onCellClick ? () => onCellClick(di, si) : undefined
                  }
                >
                  {custom}
                  {!custom && st && st !== 'off' && (
                    <span className={`bdu-week__state bdu-week__state--${st}`}>
                      {STATE_LABEL[st]}
                    </span>
                  )}
                  {!custom && st === 'off' && (
                    <span className="bdu-week__state bdu-week__state--off" />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export interface ShiftBlockProps {
  time?: React.ReactNode;
  role?: React.ReactNode;
  variant?: 'default' | 'conflict' | 'open';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/** ShiftBlock — a scheduled shift rendered inside a WeekGrid cell. */
export function ShiftBlock({
  time,
  role,
  variant = 'default',
  onClick,
}: ShiftBlockProps) {
  return (
    <div
      className={`bdu-shift ${variant !== 'default' ? `bdu-shift--${variant}` : ''}`}
      onClick={onClick}
    >
      <span className="bdu-shift__time">{time}</span>
      {role && <span className="bdu-shift__role">{role}</span>}
    </div>
  );
}
