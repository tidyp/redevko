import SubmitComment from '@/components/form/SubmitComment';
import Content from '@/components/Post/Content';
import { fetchPostDetail } from '@/server/post.action';
import { Suspense } from 'react';

import { auth } from '@/lib/nextAuth/auth';
import { fetchProfileImageAction } from '@/server/profile.action';
import { fetchPostComments } from '@/server/comment.action';

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Post Detail Data
  const data = await fetchPostDetail(params.id);
  const commentData = await fetchPostComments(params.id);
  // Post comment Data
  // const comment = await fetchPostComment(params.id);
  const session = await auth();
  const profileImage = await fetchProfileImageAction();

  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 lg:w-2/3'>
      <Suspense fallback={<div>Loading...</div>}>
        {data ? <Content data={data} /> : <div>Not found page</div>}
      </Suspense>

      {/* 로그인한 사용자만 */}
      <div className='w-full lg:w-2/3'>
        <div className='flex w-full flex-col gap-4'>
          {!session && (
            <span className='flex w-full items-center rounded-full border py-2'>
              Sign in to comment
            </span>
          )}
          {session && (
            <SubmitComment profileImage={profileImage} postId={params.id} />
          )}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {commentData.map((comment) => (
            <div key={comment.id} className='flex w-full flex-col gap-4'>
              <div className='flex w-full gap-4'></div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </Suspense>
      </div>
    </div>
  );
}
