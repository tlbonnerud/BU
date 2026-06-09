'use client';

import { useSearchParams } from 'next/navigation';

export type Role = 'ansatt' | 'admin';

/** Reads the active role from the `?rolle=` query param (defaults to admin). */
export function useRole(): Role {
  const sp = useSearchParams();
  return sp.get('rolle') === 'ansatt' ? 'ansatt' : 'admin';
}

/** Appends the current role to a path so navigation preserves it. */
export function withRole(href: string, role: Role): string {
  return `${href}?rolle=${role}`;
}
