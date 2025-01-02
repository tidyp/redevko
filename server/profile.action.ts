'use server';

import db from '@/utils/db';
import { auth } from '@/lib/nextAuth/auth';
import { ProfileSchema } from '@/models/schemas';
import { redirect } from 'next/navigation';

export const createProfileAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    // 인증
    const session = await auth();

    if (!session) throw new Error('You must be logged in to create a profile');

    const rawData = Object.fromEntries(formData);
    // 데이터 검증
    const validData = ProfileSchema.parse(rawData);
    console.log(validData);

    // 데이터베이스에 저장
    await db.profile.create({
      data: {
        firstName: session?.user?.name?.split(' ')[0],
        lastName: session?.user?.name?.split(' ')[1],
        email: session?.user?.email,
        profileImage: session?.user?.image ?? '',
        ...validData,
      },
    });

    // return {
    //   message: 'Profile created successfully',
    // };
  } catch (error) {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : 'Profile not created',
      // message: (error as Error).message,
      // message: 'Profile not created',
    };
  }

  redirect('/');
};

export const fetchProfileImageAction = async () => {

}
