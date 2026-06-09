'use client';

import { useParams, useRouter, notFound } from 'next/navigation';
import { Brukerside } from '@/components/app/screens/Brukerside';
import { AppData } from '@/components/app/data';
import { useRole, withRole } from '@/components/app/useRole';

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const role = useRole();

  const user = AppData.users.find((u) => String(u.id) === String(id));
  if (!user) notFound();

  return (
    <Brukerside
      user={user}
      onBack={() => router.push(withRole('/app/brukere', role))}
    />
  );
}
