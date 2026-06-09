// Shared mock data for the Bedrift Utility app kit (logged-in surfaces).
import type { StatusKind } from '../ds';
import type { WeekDay } from '../ds';

export interface Person {
  name: string;
  role: string;
  company: string;
  email: string;
}

export interface UserRow extends Record<string, unknown> {
  id: number;
  navn: string;
  epost: string;
  rolle: 'Ansatt' | 'Admin';
  status: StatusKind;
  timer: number;
}

export const AppData: {
  me: Person;
  admin: Person;
  days: WeekDay[];
  slots: string[];
  users: UserRow[];
} = {
  me: {
    name: 'Kim Berge',
    role: 'Ansatt',
    company: 'Nordvik AS',
    email: 'kim@bedrift.no',
  },
  admin: {
    name: 'Ola Nordmann',
    role: 'Admin',
    company: 'Nordvik AS',
    email: 'ola@bedrift.no',
  },
  days: [
    { name: 'Man', date: '2.' },
    { name: 'Tir', date: '3.', today: true },
    { name: 'Ons', date: '4.' },
    { name: 'Tor', date: '5.' },
    { name: 'Fre', date: '6.' },
    { name: 'Lør', date: '7.' },
    { name: 'Søn', date: '8.' },
  ],
  slots: ['08–10', '10–12', '12–14', '14–16', '16–18'],
  users: [
    { id: 1, navn: 'Kim Berge', epost: 'kim@bedrift.no', rolle: 'Ansatt', status: 'aktiv', timer: 32.5 },
    { id: 2, navn: 'Ola Nordmann', epost: 'ola@bedrift.no', rolle: 'Admin', status: 'aktiv', timer: 38 },
    { id: 3, navn: 'Liv Aas', epost: 'liv@bedrift.no', rolle: 'Ansatt', status: 'invitert', timer: 0 },
    { id: 4, navn: 'Per Sund', epost: 'per@bedrift.no', rolle: 'Ansatt', status: 'aktiv', timer: 27 },
    { id: 5, navn: 'Mia Holt', epost: 'mia@bedrift.no', rolle: 'Ansatt', status: 'aktiv', timer: 40 },
    { id: 6, navn: 'Tor Lie', epost: 'tor@bedrift.no', rolle: 'Ansatt', status: 'inaktiv', timer: 12 },
    { id: 7, navn: 'Nina Vik', epost: 'nina@bedrift.no', rolle: 'Ansatt', status: 'aktiv', timer: 34.5 },
  ],
};
