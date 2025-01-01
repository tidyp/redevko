'use server';

import { signIn, signOut } from '@/lib/nextAuth/auth';
// import { revalidatePath } from 'next/cache';

export async function updateUser() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
}

export async function signInAction() {
  // 프로바이더, 로그인 후 리다이렉트
  await signIn('google', { redirectTo: '/' });
}

export async function signOutAction() {
  // 프로바이더, 로그아웃 후 리다이렉트
  await signOut({ redirectTo: '/' });
}
