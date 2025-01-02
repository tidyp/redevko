'use client';

import { signOutAction } from '@/server/auth.action';
import { useToast } from '@/hooks/use-toast';

export default function SignOutButton() {
  const { toast } = useToast();

  return (
    <form
      action={signOutAction}
      onClick={() => toast({ description: 'You have been signed out' })}
    >
      <button>Logout</button>
    </form>
  );
}
