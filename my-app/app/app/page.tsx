import { redirect } from 'next/navigation';

export default function AppIndex() {
  // Default landing for the app shell.
  redirect('/app/dashbord');
}
