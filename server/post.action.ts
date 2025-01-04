'use server';

import db from '@/utils/db';
import { PostSchema, validDataFile } from '@/models/schemas';
import { uploadImage } from '@/utils/supabase';
import { fetchProfile } from './profile.action';
// import { redirect } from 'next/navigation';

export const createPostAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<{ message: string }> => {
  // 인증
  const user = await fetchProfile();
  console.log(user);

  try {
    if (!user) throw new Error('You must be logged in to create a profile');

    // 데이터 검증
    const rawData = Object.fromEntries(formData);
    const file = formData.get('profileImage') as File;
    // const category = formData.get('category');
    // console.log(`category: ${category}`);

    const validData = PostSchema.safeParse(rawData);
    const validFile = validDataFile().safeParse(file);
    console.log(`validFile: ${validFile.data}`);
    const pathUrl = await uploadImage(validFile.data!);
    console.log(`pathUrl: ${pathUrl}`);

    if (!validData.success) {
      const errors = validData.error.errors.map((error) => error.message);
      throw new Error(errors.join('\n '));
    }

    // 데이터베이스에 저장
    const newPost = {
      ...validData.data,
      image: pathUrl,
      profileId: user.id,
    };

    console.log(newPost);

    await db.post.create({
      data: newPost,
    });

    return {
      message: 'Post created successfully',
    };
  } catch (error) {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : '에러가 발생했습니다.',
    };
  }
  // redirect('/');
};

export const fetchPosts = async ({
  search = '',
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const data = await db.post.findMany({
    where: {
      category,
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
};
