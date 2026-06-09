'use client';

import React from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'right';
  sortable?: boolean;
  width?: number | string;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableSort {
  key: string;
  dir: 'asc' | 'desc';
}

export interface TableProps<T = Record<string, unknown>> {
  columns?: TableColumn<T>[];
  rows?: T[];
  sort?: TableSort | null;
  onSortChange?: (next: TableSort | null) => void;
  onRowClick?: (row: T) => void;
  rowKey?: string;
}

/**
 * Table — sortable data table. `columns: [{key, header, align, sortable, render}]`,
 * `rows: [{...}]`. Pass `onRowClick` for navigable rows.
 */
export function Table<T extends Record<string, unknown>>({
  columns = [],
  rows = [],
  sort,
  onSortChange,
  onRowClick,
  rowKey = 'id',
}: TableProps<T>) {
  const [internalSort, setInternalSort] = React.useState<TableSort | null>(null);
  const active = sort || internalSort;
  const setSort = (next: TableSort | null) => {
    if (onSortChange) onSortChange(next);
    else setInternalSort(next);
  };

  const sorted = React.useMemo(() => {
    if (!active) return rows;
    const col = columns.find((c) => c.key === active.key);
    if (!col) return rows;
    const dir = active.dir === 'desc' ? -1 : 1;
    return [...rows].sort((a, b) => {
      const av = a[active.key];
      const bv = b[active.key];
      if (typeof av === 'number' && typeof bv === 'number')
        return (av - bv) * dir;
      return (
        String(av ?? '').localeCompare(String(bv ?? ''), 'no') * dir
      );
    });
  }, [rows, active, columns]);

  const toggle = (key: string) => {
    if (!active || active.key !== key) setSort({ key, dir: 'asc' });
    else if (active.dir === 'asc') setSort({ key, dir: 'desc' });
    else setSort(null);
  };

  return (
    <div className="bdu-table-wrap">
      <table className="bdu-table">
        <thead>
          <tr>
            {columns.map((c) => {
              const isActive = active && active.key === c.key;
              const num = c.align === 'right';
              return (
                <th
                  key={c.key}
                  style={c.width ? { width: c.width } : undefined}
                  className={[
                    c.sortable && 'bdu-th--sortable',
                    isActive && 'bdu-th--active',
                    num && 'bdu-th--num',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={c.sortable ? () => toggle(c.key) : undefined}
                >
                  <span className="bdu-th__inner">
                    {c.header}
                    {c.sortable && (
                      <svg
                        className="bdu-th__arrow"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {isActive && active.dir === 'desc' ? (
                          <path d="m6 9 6 6 6-6" />
                        ) : (
                          <path d="m18 15-6-6-6 6" />
                        )}
                      </svg>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={(row[rowKey] as React.Key) ?? i}
              className={onRowClick ? 'bdu-tr--clickable' : ''}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={c.align === 'right' ? 'bdu-td--num' : ''}
                >
                  {c.render
                    ? c.render(row[c.key], row)
                    : (row[c.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
