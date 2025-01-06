'use server';

import db from '@/utils/db';
import { fetchProfile } from './profile.action';
import { CommentSchema } from '@/models/schemas';
import { revalidatePath } from 'next/cache';

export const createCommentAction = async (
  prevState: any,
  formData: FormData,
) => {
  const user = await fetchProfile();
  console.log(user);

  try {
    const rawData = Object.fromEntries(formData);
    console.log('rawData');
    console.log(rawData);

    // 검증: postId, comment
    const validData = CommentSchema.safeParse(rawData);
    console.log('validData');
    console.log(validData);

    const newComment = {
      profileId: user.id,
      ...validData.data,
    };

    console.log(newComment);

    // DB에 저장
    await db.comment.create({
      data: newComment,
    });

    revalidatePath('/post');
    return { message: 'create comment' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }

  // return { message: 'create comment' };
};

export const fetchPostComments = async (postId: string) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
  });
  return comments;
};

// export const fetchPostCommentsByUser = async () => {
//   return { message: 'fetch user comments' };
// };

export const deleteCommentAction = async () => {
  return { message: 'delete  comments' };
};
