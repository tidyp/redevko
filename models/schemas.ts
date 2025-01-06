import * as z from 'zod';
import { ZodSchema } from 'zod';

// 스키마 정의
export const UserSchema: ZodSchema = z.object({});

export const ProfileSchema: ZodSchema = z.object({
  nickname: z
    .string()
    .nonempty({ message: '닉네임은 필수입니다.' })
    .min(2, { message: '닉네임은 2자 이상이어야 합니다.' }),
  job: z.string().min(2, { message: '직업은 2자 이상이어야 합니다.' }),
});

export const imageSchema = z.object({
  profileImage: validDataFile(),
});

export const PostSchema: ZodSchema = z.object({
  title: z.string().nonempty({ message: '제목은 필수입니다.' }),
  content: z.string().nonempty({ message: '내용은 필수입니다.' }),
  category: z.string().nonempty({ message: '카테고리는 필수입니다.' }),
});

export const CommentSchema: ZodSchema = z.object({
  postId: z.string().nonempty({ message: '게시글이 잘 못됨.' }),
  comment: z.string().nonempty({ message: '내용이 없습니다.' }),
});
//
//
//

// TODO?: helper 함수로 분리
// 유효성 검사 함수 정의
export function validDataFile() {
  const maxSize = 1024 ** 2;
  const acceptedFileTypes = ['image/'];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxSize;
    }, '1MB 이하의 이미지 파일만 업로드 가능합니다.')
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, '이미지 파일만 업로드 가능합니다.');
}

// USAGE: validDataWithZodSchema(ProfileSchema, data)
export function validDataWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown,
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join('\n '));
  }

  return result.data;
}

export const ImageSchema: ZodSchema = z.object({
  image: z.string(),
});
