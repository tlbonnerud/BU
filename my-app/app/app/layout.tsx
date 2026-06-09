'use client';

import { Suspense } from 'react';
import { AppChrome } from '@/components/app/AppChrome';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Suspense boundary: AppChrome and the screens read `?rolle=` via useSearchParams.
  return (
    <Suspense fallback={null}>
      <AppChrome>{children}</AppChrome>
    </Suspense>
  );
}
