'use server';

import db from '@/utils/db';
import { auth } from '@/lib/nextAuth/auth';
import { ProfileSchema, validDataFile } from '@/models/schemas';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/utils/supabase';

const errorHandler = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : '에러가 발생했습니다.',
    // message: (error as Error).message,
    // message: 'Profile not created',
  };
};

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
    return errorHandler(error);
  }

  redirect('/');
};

export const fetchProfileImageAction = async () => {
  // nextAuth에서 세션을 가져온다.
  const session = await auth();

  // 세션이 없으면 null을 반환한다.
  if (!session) return null;

  // 세션정보로 데이터베이스에서 프로필 이미지를 가져온다.
  const profile = await db.profile.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: {
      profileImage: true,
    },
  });

  return profile?.profileImage;
};

export const fetchProfile = async () => {
  const session = await auth();

  if (!session) return null;

  const profile = await db.profile.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  try {
    // 인증
    const session = await auth();
    if (!session) throw new Error('You must be logged in to create a profile');

    // 데이터 검증
    const rawData = Object.fromEntries(formData);
    const validData = ProfileSchema.safeParse(rawData);

    // if(!validData.success) throw new Error('입력값이 올바르지 않습니다.');
    if (!validData.success) {
      const errors = validData.error.errors.map((error) => error.message);
      throw new Error(errors.join('\n '));
    }

    // 데이터베이스에 저장
    await db.profile.update({
      where: {
        email: session?.user?.email!,
      },
      data: validData.data,
    });

    revalidatePath('/profile/update');
    return {
      message: '프로필이 업데이트되었습니다.',
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string }> => {
  const session = await auth();
  try {
    const image = formData.get('profileImage') as File;
    const validData = validDataFile().safeParse(image);

    if (!validData.success) {
      const errors = validData.error.errors.map((error) => error.message);
      throw new Error(errors.join('\n '));
    }

    console.log(validData.data);
    const imageUrl = await uploadImage(validData.data);

    await db.profile.update({
      where: {
        email: session?.user?.email!,
      },
      data: {
        profileImage: imageUrl,
      },
    });
    revalidatePath('/profile');
    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return errorHandler(error);
  }
};

// const getAuthUser = async () => {
//   const isLogin = await auth();

//   if (!isLogin) throw new Error('로그인 정보가 없습니다.');

//   return isLogin;
// };
