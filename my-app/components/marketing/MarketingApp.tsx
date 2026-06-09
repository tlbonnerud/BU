'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Landing } from './Landing';
import { Auth } from './Auth';

type View = 'landing' | 'auth';

/**
 * MarketingApp — entry point that mirrors ui_kits/marketing/index.html.
 * "Logg inn" / "Kom i gang" / "Prøv gratis" flip the landing page to the auth
 * screen; a successful submit routes onward to the logged-in app shell (/app).
 */
export function MarketingApp() {
  const router = useRouter();
  const [view, setView] = React.useState<View>('landing');

  if (view === 'auth') {
    return (
      <Auth
        onBack={() => setView('landing')}
        onAuthed={() => router.push('/app/dashbord')}
      />
    );
  }

  return (
    <Landing onLogin={() => setView('auth')} onStart={() => setView('auth')} />
  );
}
