'use client';

import { useRouter } from 'next/navigation';
import { Dashbord } from '@/components/app/screens/Dashbord';
import { useRole, withRole } from '@/components/app/useRole';

export default function Page() {
  const router = useRouter();
  const role = useRole();
  return (
    <Dashbord
      onOpenUser={(u) => router.push(withRole(`/app/brukere/${u.id}`, role))}
    />
  );
}
