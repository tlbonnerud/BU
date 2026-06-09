'use client';

import React from 'react';

const I =
  (paths: React.ReactNode) =>
  // eslint-disable-next-line react/display-name
  () =>
    (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths}
      </svg>
    );

const Icons: Record<string, () => React.ReactElement> = {
  home: I(
    <>
      <path d="M3 9.5 12 3l9 6.5" />
      <path d="M5 10v10h14V10" />
    </>,
  ),
  user: I(
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
    </>,
  ),
  calendar: I(
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>,
  ),
  grid: I(
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
    </>,
  ),
  users: I(
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    </>,
  ),
  clock: I(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>,
  ),
  layers: I(
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </>,
  ),
  check: I(
    <>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </>,
  ),
};

export interface NavItem {
  key: string;
  label: React.ReactNode;
  icon?: string;
}

export interface NavSection {
  section?: string | null;
  items: NavItem[];
}

export interface SidebarUser {
  name: React.ReactNode;
  role: React.ReactNode;
  avatar?: React.ReactNode;
}

export interface SidebarProps {
  role?: 'ansatt' | 'admin';
  active?: string;
  onNavigate?: (key: string) => void;
  nav?: NavSection[];
  user?: SidebarUser;
  badges?: Record<string, React.ReactNode>;
}

const NAV: Record<'ansatt' | 'admin', NavSection[]> = {
  ansatt: [
    {
      section: null,
      items: [
        { key: 'profil', label: 'Min profil', icon: 'user' },
        { key: 'tilgjengelighet', label: 'Tilgjengelighet', icon: 'calendar' },
        { key: 'timeplan', label: 'Min timeplan', icon: 'grid' },
      ],
    },
  ],
  admin: [
    {
      section: null,
      items: [
        { key: 'dashbord', label: 'Dashbord', icon: 'home' },
        { key: 'brukere', label: 'Brukere', icon: 'users' },
      ],
    },
    {
      section: 'Planlegging',
      items: [
        { key: 'timeplanlegger', label: 'Timeplanlegger', icon: 'layers' },
        { key: 'timeoversikt', label: 'Timeoversikt', icon: 'check' },
      ],
    },
    {
      section: 'Min konto',
      items: [{ key: 'profil', label: 'Min profil', icon: 'user' }],
    },
  ],
};

/** Sidebar — role-based app navigation (ansatt vs admin) with brand + user footer. */
export function Sidebar({
  role = 'ansatt',
  active,
  onNavigate,
  nav,
  user,
  badges = {},
}: SidebarProps) {
  const sections = nav || NAV[role] || NAV.ansatt;
  return (
    <aside className="bdu-sidebar">
      <div className="bdu-sidebar__brand">
        <svg className="bdu-sidebar__mark" viewBox="0 0 40 40" fill="none">
          <rect x="2" y="2" width="36" height="36" rx="10" fill="#0A0B0A" />
          <rect x="9" y="9" width="10" height="10" rx="2.6" fill="#fff" />
          <rect x="21" y="9" width="10" height="10" rx="2.6" fill="#383E3B" />
          <rect x="9" y="21" width="10" height="10" rx="2.6" fill="#383E3B" />
          <rect x="21" y="21" width="10" height="10" rx="2.6" fill="#02B96C" />
        </svg>
        <span className="bdu-sidebar__word">
          Bedrift<b>Utility</b>
        </span>
      </div>
      <nav className="bdu-sidebar__nav">
        {sections.map((sec, si) => (
          <React.Fragment key={si}>
            {sec.section && (
              <div className="bdu-sidebar__sec">{sec.section}</div>
            )}
            {sec.items.map((it) => {
              const Ico = (it.icon && Icons[it.icon]) || Icons.grid;
              const b = badges[it.key];
              return (
                <button
                  key={it.key}
                  className={`bdu-navitem ${active === it.key ? 'bdu-navitem--active' : ''}`}
                  onClick={() => onNavigate && onNavigate(it.key)}
                >
                  <span className="bdu-navitem__icon">
                    <Ico />
                  </span>
                  {it.label}
                  {b != null && (
                    <span className="bdu-navitem__badge">{b}</span>
                  )}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </nav>
      {user && (
        <div className="bdu-sidebar__foot">
          <div className="bdu-sidebar__user">
            {user.avatar}
            <div>
              <div className="bdu-sidebar__uname">{user.name}</div>
              <div className="bdu-sidebar__urole">{user.role}</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
