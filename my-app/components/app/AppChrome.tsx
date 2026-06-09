'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  Topbar,
  SearchField,
  Avatar,
  IconButton,
  Tooltip,
} from '../ds';
import { AppIcons } from './icons';
import { AppData } from './data';
import { useRole, withRole, type Role } from './useRole';

const TITLES: Record<string, string> = {
  profil: 'Min profil',
  tilgjengelighet: 'Tilgjengelighet',
  timeplan: 'Min timeplan',
  dashbord: 'Dashbord',
  brukere: 'Brukere',
  timeplanlegger: 'Timeplanlegger',
  timeoversikt: 'Timeoversikt',
};
const FIRST: Record<Role, string> = { ansatt: 'profil', admin: 'dashbord' };

/**
 * AppChrome — persistent app shell (sidebar + topbar) rendered once by the
 * /app layout. Active nav is derived from the URL; the role lives in `?rolle=`.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const role = useRole();

  const parts = pathname.split('/'); // ['', 'app', '<seg>', '<id>?']
  const seg = parts[2] || 'dashbord';
  const person = role === 'admin' ? AppData.admin : AppData.me;

  // Topbar title — the user's name on the Brukerside detail route.
  let title = TITLES[seg] || '';
  if (seg === 'brukere' && parts[3]) {
    const u = AppData.users.find((x) => String(x.id) === parts[3]);
    if (u) title = u.navn;
  }

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pathname]);

  const go = (key: string) => router.push(withRole(`/app/${key}`, role));
  const switchRole = (r: Role) => router.push(withRole(`/app/${FIRST[r]}`, r));

  return (
    <div className="app-shell">
      <Sidebar
        role={role}
        active={seg}
        onNavigate={go}
        badges={role === 'admin' ? { brukere: 3, timeoversikt: 9 } : {}}
        user={{
          name: person.name,
          role: `${person.role} · ${person.company}`,
          avatar: <Avatar name={person.name} size="sm" />,
        }}
      />
      <div className="app-main">
        <Topbar
          title={title}
          search={
            role === 'admin' ? (
              <SearchField placeholder="Søk i Bedrift Utility" />
            ) : null
          }
          actions={
            <>
              <div className="app-roleswitch" title="Bytt rolle (demo)">
                <button
                  className={role === 'ansatt' ? 'is-on' : ''}
                  onClick={() => switchRole('ansatt')}
                >
                  Ansatt
                </button>
                <button
                  className={role === 'admin' ? 'is-on' : ''}
                  onClick={() => switchRole('admin')}
                >
                  Admin
                </button>
              </div>
              <Tooltip label="Logg ut">
                <IconButton label="Logg ut" onClick={() => router.push('/')}>
                  <AppIcons.signOut />
                </IconButton>
              </Tooltip>
            </>
          }
          user={<Avatar name={person.name} size="sm" />}
        />
        <div className="app-scroll" ref={scrollRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
