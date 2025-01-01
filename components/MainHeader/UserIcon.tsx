import { UserCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function UserIcon() {
  return (
    <>
      <Link href='/auth/login'>
        <UserCircle2 className='h-8 w-8 rounded-full dark:bg-muted' />
      </Link>
    </>
  );
}
