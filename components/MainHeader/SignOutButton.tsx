'use client';

import { signOutAction } from '@/server/auth.action';
import { useToast } from '@/hooks/use-toast';

export default function SignOutButton() {
  const { toast } = useToast();

  return (
    <form
      action={signOutAction}
      onClick={() => toast({ description: '로그아웃 되었습니다.' })}
    >
      <button>Logout</button>
    </form>
  );
}
