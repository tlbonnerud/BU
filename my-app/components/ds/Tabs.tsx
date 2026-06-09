'use client';

import React from 'react';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs?: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
}

/** Tabs — underline tab bar. `tabs: [{value,label,count,icon}]`. */
export function Tabs({ tabs = [], value, onChange }: TabsProps) {
  return (
    <div className="bdu-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={t.value === value}
          className={`bdu-tab ${t.value === value ? 'bdu-tab--active' : ''}`}
          onClick={() => onChange && onChange(t.value)}
        >
          {t.icon}
          {t.label}
          {t.count != null && (
            <span className="bdu-tab__count">{t.count}</span>
          )}
          <span className="bdu-tab__bar" />
        </button>
      ))}
    </div>
  );
}
